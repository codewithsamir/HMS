import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { databases } from "@/models/client/config";
import { ID, Query } from "appwrite";
import { toast } from "sonner";
import { useAuthStore } from "./Auth"; // Import Auth Store
import { db, appointmentdata } from "@/models/name";
import { useDoctorStore } from "./Doctor";

export interface Appointment {
  id: string;                // Unique ID for the appointment
  doctor_id: string;         // ID of the assigned doctor
  patient_id: string;        // ID of the patient
  appointment_date: string;  // Date of the appointment
  appointment_time: string;  // Time of the appointment
  appointment_reason: string; // Reason for the appointment
  status: string;            // Appointment status (e.g., "scheduled", "completed", "cancelled")
  doctor?: {                 // Optional doctor data
    name: string;
    specialization: string;
    experience: string;
    contact: string;
    imageUrl: string;
    gender: string;
  };
}

interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  bookAppointment(data: Omit<Appointment, "id" | "patient_id" | "status">): Promise<boolean>;
  fetchAppointments(): Promise<void>;
  cancelAppointment(appointmentId: string): Promise<boolean>;
  updateAppointmentStatus(appointmentId: string, status: string): Promise<boolean>;
  getAppointmentSummary(): { totalCompleted: number; totalUpcoming: number ; total:number};
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    immer((set, get) => ({
      appointments: [],
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

          const response = await databases.createDocument(
            db,
            appointmentdata,
            ID.unique(),
            appointmentData
          );

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
          const response = await databases.listDocuments(
            db,
            appointmentdata,
            [Query.equal("patient_id", user.$id)]
          );
          
          // Use useDoctorStore to fetch doctor data for each appointment
          const doctorStore = useDoctorStore.getState();
      
          const appointmentsWithDoctorData = await Promise.all(
            response.documents.map(async (apt) => {
              const doctor = await doctorStore.getDoctorById(apt.doctor_id); // Fetch doctor data using doctor_id
              return {
                ...apt,
                doctor: doctor ? {
                  name: doctor.name,
                  specialization: doctor.specialization,
                  experience: doctor.experience,
                  contact: doctor.contact,
                  imageUrl: doctor.imageUrl,
                  gender: doctor.gender,
                } : null,
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

      // New method to get the total appointments done (completed)
      // and total upcoming (scheduled) appointments.
      getAppointmentSummary() {
        const { appointments } = get();
        const totalCompleted = appointments.filter(apt => apt.status.toLowerCase() === 'completed').length;
        const totalUpcoming = appointments.filter(apt => apt.status.toLowerCase() === 'scheduled').length;
        const total = appointments.length;
        return { totalCompleted, totalUpcoming,total };
      },
    })),
    { name: "appointments" }
  )
);
