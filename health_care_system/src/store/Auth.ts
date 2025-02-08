import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { account } from "@/models/client/config";
import { AppwriteException, ID, OAuthProvider, Models } from "appwrite";

export interface UserPrefs {
  role?: string;
}

interface AuthState {
  user: Models.User<UserPrefs> | null;
  session: Models.Session | null;
  jwt: string | null;
  hydrated: boolean;

  setHydrated(): void;
  getUser(): Promise<void>;
  registerUser(name: string, email: string, password: string, role: string): Promise<{ success: boolean; error?: AppwriteException | null; }>;
  loginUser(email: string, password: string): Promise<{ success: boolean; error?: AppwriteException | null; }>;
  logoutUser(): Promise<void>;
  setRole(role: string): Promise<{ success: boolean; error?: AppwriteException | null; }>;
  loginWithGoogle(role:string): Promise<{ success: boolean; error?: AppwriteException | null; }>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      user: null,
      session: null,
      jwt: null,
      hydrated: false,
      error:null,

      setHydrated() {
        set({ hydrated: true });
      },

      async getUser() {
        try {
          const session = await account.getSession("current");
          const user = await account.get<UserPrefs>();
          // console.log("it g",user,session)
          set({ session, user });
        } catch (error) {
          console.log(error);
          
        }
      },

      async registerUser(name, email, password, role) {
        try {
         await account.create(ID.unique(), email, password, name);
                   // Log in the newly created user
        const loginResponse = await useAuthStore.getState().loginUser(email, password);
    
              if (!loginResponse.success) {
                throw new Error("Login failed after registration");
              }


         await useAuthStore.getState().setRole(role);
          // console.log(res,roles)
          return { success: true };
        } catch (error) {
          return { success: false, error: error instanceof AppwriteException ? error : null };
        }
      },

      async loginUser(email, password) {
        try {
          const session = await account.createEmailPasswordSession(email, password);
          // const user = await account.get<UserPrefs>();
          // const { jwt } = await account.createJWT();
          // console.log( "it jwt",jwt);
          // console.log("it user",user);
          set({ session });
          return { success: true };
        } catch (error) {
          return { success: false, error: error instanceof AppwriteException ? error : null };
        }
      },

      async logoutUser() {
        try {
          await account.deleteSession("current");
          set({ session: null, user: null, jwt: null });
        } catch (error) {
          console.log(error);
        }
      },

      async setRole(role) {
        try {
          await account.updatePrefs({ role });
          set((state) => {
            if (state.user) state.user.prefs = { ...state.user.prefs, role };
          });
          return { success: true };
        } catch (error) {
          return { success: false, error: error instanceof AppwriteException ? error : null };
        }
      },

      async loginWithGoogle(role) {
        try {
          await account.createOAuth2Session(
            OAuthProvider.Google,
            `http://localhost:3000/${role}/Dashboard`,
            "http://localhost:3000/fail",
            ["email","profile"]
          );
          return { success: true };
        } catch (error) {
          return { success: false, error: error instanceof AppwriteException ? error : null };
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
