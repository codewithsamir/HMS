"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../ui/spinner";
import { useAuthStore } from "@/store/Auth";
import Loaderbgwrapper from "./Loaderbgwrapper";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { getUser, user, hydrated } = useAuthStore();
  const [loading, setLoading] = useState(true); // Start with loading true
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user only if not already fetched
        if (!user && hydrated) {
          await getUser();
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        // Ensure loading is set to false after fetching
        setLoading(false);
      }
    };

    // Call fetchUser only if the store is hydrated
    if (hydrated) {
      fetchUser();
    }
  }, [hydrated, getUser, user]);

  useEffect(() => {
    // Redirect to login if user is not authenticated and loading is complete
    if (!loading && !user) {
      router.replace(`/Login/${role}`);
    }
  }, [loading, user, role, router]);

  // Show loader while loading or not hydrated
  if (loading || !hydrated) {
    return (
      <Loaderbgwrapper>
        <Spinner size={60} />
      </Loaderbgwrapper>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;