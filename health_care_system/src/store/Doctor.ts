import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { storage, databases } from "@/models/client/config";
import { ID, Query } from "appwrite";
import { toast } from "sonner";
import { useAuthStore } from "./Auth"; // Import the Auth Store
import { db, ImageBucket, doctorInformation } from "@/models/name";
import env from "@/app/env";

export interface DoctorProfile {
  doctorid: string;
  name: string;
  specialization: string;
  experience: string;
  contact: string;
  imageUrl: string;
  imageid: string;
  gender: string;
}

interface DoctorState {
  profile: DoctorProfile | null;
  Alldoctor: DoctorProfile[] | null;
  getDoctorById(doctorId: string): Promise<DoctorProfile | undefined>;
  loading: boolean;
  uploadDoctorImage(image: File): Promise<{ imageUrl: string; imageid: string } | null>;
  saveDoctorProfile(data: Omit<DoctorProfile, "doctorid">): Promise<boolean>;
  fetchDoctorProfile(): Promise<void>;
  fetchDoctors(): Promise<void>;
}

export const useDoctorStore = create<DoctorState>()(
  persist(
    immer((set, get) => ({
      profile: null,
      Alldoctor: null,
      loading: false,

      async uploadDoctorImage(image) {
        try {
          const user = useAuthStore.getState().user; // Get authenticated user
          if (!user) {
            toast.error("User not authenticated.");
            return null;
          }

          const imageUploadResponse = await storage.createFile(
            ImageBucket, // Storage Bucket ID
            ID.unique(),
            image
          );

          const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${ImageBucket}/files/${imageUploadResponse.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

          return { imageUrl, imageid: imageUploadResponse.$id };
        } catch (error) {
          console.error("Image Upload Error:", error);
          toast.error("Failed to upload image.");
          return null;
        }
      },

      async saveDoctorProfile(data) {
        try {
          const user = useAuthStore.getState().user; // Get authenticated user
          if (!user) {
            toast.error("User not authenticated.");
            return false;
          }

          const profileData = {
            doctorid: user.$id,
            ...data,
          };

          await databases.createDocument(
            db,                 // Database ID
            doctorInformation,  // Collection ID
            ID.unique(),
            profileData
          );

          // Update local state with new profile data
          set((state) => {
            state.profile = profileData;
          });

          toast.success("Doctor profile saved successfully.");
          return true;
        } catch (error) {
          console.error("Error saving doctor profile:", error);
          toast.error("Failed to save doctor profile.");
          return false;
        }
      },

      async fetchDoctorProfile() {
        try {
          set({ loading: true });
          const user = useAuthStore.getState().user; // Get authenticated user
          if (!user) return;

          const response = await databases.listDocuments(
            db,                 // Database ID
            doctorInformation,  // Collection ID
            [Query.equal("doctorid", user.$id)]
          );

          if (response.total > 0) {
            set({ profile: response.documents[0] as DoctorProfile });
          } else {
            set({ profile: null });
          }
        } catch (error) {
          set({ profile: null });
          console.error("Error fetching doctor profile:", error);
          toast.error("Failed to fetch doctor profile.");
        } finally {
          set({ loading: false });
        }
      },

      async getDoctorById(doctorId) {
        console.log("doctorId", doctorId);
        try {
          set({ loading: true });
          const response = await databases.listDocuments(
            db,                 // Database ID
            doctorInformation,  // Collection ID
            [Query.equal("doctorid", doctorId)]
          );

          if (response.total > 0) {
            return response.documents[0] as DoctorProfile;
          } else {
            return undefined;
          }
        } catch (error) {
          console.error("Error fetching doctor profile:", error);
          toast.error("Failed to fetch doctor profile.");
          return undefined;
        } finally {
          set({ loading: false });
        }
      },

      async fetchDoctors() {
        try {
          set({ loading: true });
          const response = await databases.listDocuments(
            db,                 // Database ID
            doctorInformation   // Collection ID
          );

          if (response.total > 0) {
            set({ Alldoctor: response.documents as DoctorProfile[] });
          } else {
            set({ Alldoctor: null });
          }
        } catch (error) {
          set({ Alldoctor: null });
          console.error("Error fetching doctors:", error);
          toast.error("Failed to fetch doctors.");
        } finally {
          set({ loading: false });
        }
      },
    })),
    { name: "doctor" }
  )
);