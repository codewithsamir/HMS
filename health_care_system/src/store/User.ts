import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { storage, databases } from "@/models/client/config";
import { ID, Query } from "appwrite";
import { toast } from "sonner";
import { useAuthStore } from "./Auth"; // Import the Auth Store
import { db, ImageBucket, patientinfo } from "@/models/name";

export interface UserProfile {
  userid: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  imageurl: string;
  imageid: string;
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  uploadProfileImage(image: File): Promise<{ imageurl: string; imageid: string } | null>;
  saveUserProfile(data: Omit<UserProfile, "userid">): Promise<boolean>;
  fetchUserProfile(): Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    immer((set, get) => ({
      profile: null,
      loading: false,

      async uploadProfileImage(image) {
        try {
          const user = useAuthStore.getState().user; // Get user from AuthStore
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

          return { imageurl: imageUrl, imageid: imageUploadResponse.$id };
        } catch (error) {
          console.error("Image Upload Error:", error);
          toast.error("Failed to upload image.");
          return null;
        }
      },

      async saveUserProfile(data) {
        try {
          const user = useAuthStore.getState().user; // Get user from AuthStore
          if (!user) {
            toast.error("User not authenticated.");
            return false;
          }

          const profileData = {
            userid: user.$id,
            ...data,
          };

          await databases.createDocument(
            db,         // Database ID
            patientinfo, // Collection ID
            ID.unique(),
            profileData
          );

          // Update the local state with the new profile data
          set((state) => {
            state.profile = profileData;
          });

          toast.success("Profile saved successfully.");
          return true;
        } catch (error) {
          console.error("Error saving profile:", error);
          toast.error("Failed to save profile.");
          return false;
        }
      },

      async fetchUserProfile() {
        try {
          const user = useAuthStore.getState().user; // Get user from AuthStore
          if (!user) return;

          const response = await databases.listDocuments(
            db,         // Database ID
            patientinfo, // Collection ID
            [
              Query.equal('userid', user.$id)
            ]
          );

            // console.log(response,user.$id);
          if (response.total > 0) {
            set({ profile: response.documents[0] as UserProfile });
          } else {
            set({ profile: null });
          }
        } catch (error) {
          set({ profile: null });
          console.error("Error fetching profile:", error);
          toast.error("Failed to fetch profile.");
        } finally {
          set({ loading: false });
        }
      },
    })),
    { name: "user" }
  )
);
