import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { databases } from "@/models/client/config";
import { ID, Query } from "appwrite";
import { toast } from "sonner";
import { useAuthStore } from "./Auth"; // Import Auth Store
import { db, appointmentdata } from "@/models/name";
import { useDoctorStore } from "./Doctor";
import { useUserStore } from "./User";

export interface Appointment {
  id: string; // Unique ID for the appointment
  doctor_id: string; // ID of the assigned doctor
  patient_id: string; // ID of the patient
  appointment_date: string; // Date of the appointment
  appointment_time: string; // Time of the appointment
  appointment_reason: string; // Reason for the appointment
  status: string; // Appointment status (e.g., "scheduled", "completed", "cancelled")
  doctor?: {
    // Optional doctor data
    name: string;
    specialization: string;
    experience: string;
    contact: string;
    imageUrl: string;
    gender: string;
  };
}

export interface DoctorAppointment {
  id: string; // Unique ID for the appointment
  doctor_id: string; // ID of the assigned doctor
  patient_id: string; // ID of the patient
  appointment_date: string; // Date of the appointment
  appointment_time: string; // Time of the appointment
  appointment_reason: string; // Reason for the appointment
  status: string; // Appointment status (e.g., "scheduled", "completed", "cancelled")
  user?: {
    // Optional patient data
    name: string;
    age: number;
    gender: string;
    contact: string;
    imageurl: string;
  };
}

interface AppointmentState {
  appointments: Appointment[];
  doctorappointment: DoctorAppointment[];
  loading: boolean;
  bookAppointment(data: Omit<Appointment, "id" | "patient_id" | "status">): Promise<boolean>;
  fetchAppointments(): Promise<void>;
  fetchAppointmentsfordoctor(): Promise<void>;
  cancelAppointment(appointmentId: string): Promise<boolean>;
  updateAppointmentStatus(appointmentId: string, status: string): Promise<boolean>;
  getAppointmentSummary(): { totalCompleted: number; totalUpcoming: number; total: number };
  getTotalPatientInfoForDoctor(): Promise<Array<{
    name: string;
    age: number;
    gender: string;
    contact: string;
    imageurl: string;
  }>>; 
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    immer((set, get) => ({
      appointments: [],
      doctorappointment: [], // Initialize doctorappointment
      loading: false,

      async bookAppointment(data) {
        try {
          const user = useAuthStore.getState().user;
          if (!user) {
            toast.error("User not authenticated.");
            return false;
          }

          const appointmentData = {
            ...data,
            patient_id: user.$id, // Assign logged-in user as the patient
            status: "scheduled",
          };

          const response = await databases.createDocument(db, appointmentdata, ID.unique(), appointmentData);

          set((state) => {
            state.appointments.push({ id: response.$id, ...appointmentData });
          });

          toast.success("Appointment booked successfully.");
          return true;
        } catch (error) {
          console.error("Error booking appointment:", error);
          toast.error("Failed to book appointment.");
          return false;
        }
      },

      async fetchAppointments() {
        try {
          const user = useAuthStore.getState().user;
          if (!user) return;

          set({ loading: true });

          // Fetch appointments for the logged-in user
          const response = await databases.listDocuments(db, appointmentdata, [Query.equal("patient_id", user.$id)]);

          // Use useDoctorStore to fetch doctor data for each appointment
          const doctorStore = useDoctorStore.getState();

          const appointmentsWithDoctorData = await Promise.all(
            response.documents.map(async (apt) => {
              const doctor = await doctorStore.getDoctorById(apt.doctor_id); // Fetch doctor data using doctor_id
              return {
                ...apt,
                doctor: doctor
                  ? {
                      name: doctor.name,
                      specialization: doctor.specialization,
                      experience: doctor.experience,
                      contact: doctor.contact,
                      imageUrl: doctor.imageUrl,
                      gender: doctor.gender,
                    }
                  : null,
              };
            })
          );

          // Update state with appointments and doctor data
          set({ appointments: appointmentsWithDoctorData as Appointment[] });
        } catch (error) {
          console.error("Error fetching appointments:", error);
          toast.error("Failed to fetch appointments.");
        } finally {
          set({ loading: false });
        }
      },

      async fetchAppointmentsfordoctor() {
        try {
          const user = useAuthStore.getState().user;
          if (!user) return;

          set({ loading: true });

          // Fetch appointments for the logged-in doctor
          const response = await databases.listDocuments(db, appointmentdata, [Query.equal("doctor_id", user.$id)]);

          // Use useUserStore to fetch patient data for each appointment
          const userStore = useUserStore.getState();

          const appointmentsWithDoctorData = await Promise.all(
            response.documents.map(async (apt) => {
              const user = await userStore.fetchUserProfileById(apt.patient_id); // Fetch patient data using patient_id
              if (!user) {
                console.error("User data not found for patient:", apt.patient_id);
                return null; // Skip this appointment if user data is not found
              }
              return {
                ...apt,
                user: {
                  name: user.name,
                  age: user.age,
                  gender: user.gender,
                  contact: user.contact,
                  imageurl: user.imageurl,
                },
              };
            })
          );

          // Filter out null values (appointments without user data)
          const filteredAppointments = appointmentsWithDoctorData.filter((apt) => apt !== null);

          // Update state with appointments and patient data
          set({ doctorappointment: filteredAppointments as DoctorAppointment[] });
        } catch (error) {
          console.error("Error fetching appointments:", error);
          toast.error("Failed to fetch appointments.");
        } finally {
          set({ loading: false });
        }
      },

      async cancelAppointment(appointmentId) {
        try {
          await databases.deleteDocument(db, appointmentdata, appointmentId);

          set((state) => {
            state.appointments = state.appointments.filter((apt) => apt.id !== appointmentId);
          });

          toast.success("Appointment canceled successfully.");
          return true;
        } catch (error) {
          console.error("Error canceling appointment:", error);
          toast.error("Failed to cancel appointment.");
          return false;
        }
      },

      async updateAppointmentStatus(appointmentId, status) {
        try {
          await databases.updateDocument(db, appointmentdata, appointmentId, { status });

          set((state) => {
            const appointment = state.appointments.find((apt) => apt.id === appointmentId);
            if (appointment) appointment.status = status;
          });

          toast.success("Appointment status updated.");
          return true;
        } catch (error) {
          console.error("Error updating status:", error);
          toast.error("Failed to update appointment status.");
          return false;
        }
      },

      // Method to get the total appointments done (completed) and total upcoming (scheduled) appointments.
      getAppointmentSummary() {
        const { appointments } = get();
        const totalCompleted = appointments.filter((apt) => apt.status.toLowerCase() === "completed").length;
        const totalUpcoming = appointments.filter((apt) => apt.status.toLowerCase() === "scheduled").length;
        const total = appointments.length;
        return { totalCompleted, totalUpcoming, total };
      },

      // New method: Get total patient information for a specific doctor
      async getTotalPatientInfoForDoctor() {
        try {
          const user = useAuthStore.getState().user;
          if (!user) return;
          set({ loading: true });

          // Fetch all appointments for the specific doctor
          const response = await databases.listDocuments(db, appointmentdata, [Query.equal("doctor_id", user.$id)]);

          // Extract unique patient IDs from the appointments
          const uniquePatientIds = [...new Set(response.documents.map((apt) => apt.patient_id))];

          // Fetch patient information for each unique patient ID
          const userStore = useUserStore.getState();
          const patientInfo = await Promise.all(
            uniquePatientIds.map(async (patientId) => {
              const user = await userStore.fetchUserProfileById(patientId);
              if (!user) {
                console.error("User data not found for patient:", patientId);
                return null;
              }
              return {
                name: user.name,
                age: user.age,
                gender: user.gender,
                contact: user.contact,
                imageurl: user.imageurl,
              };
            })
          );

          // Filter out null values (patients without data)
          const filteredPatientInfo = patientInfo.filter((patient) => patient !== null);

          return filteredPatientInfo;
        } catch (error) {
          console.error("Error fetching patient information:", error);
          toast.error("Failed to fetch patient information.");
          return [];
        } finally {
          set({ loading: false });
        }
      },
    })),
    { name: "appointments" }
  )
);