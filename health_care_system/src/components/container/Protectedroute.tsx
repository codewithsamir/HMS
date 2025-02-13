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
  const [loading, setLoading] = useState(!user); // Only set loading if user is null
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) { // Fetch only if user is null
        await getUser();
      }
      setLoading(false);
    };

    if (hydrated) {
      fetchUser();
    }
  }, [ hydrated]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/Login/${role}`);
    }
  }, [user, role, loading, router]);

  if (loading || !hydrated)
    return (
      <Loaderbgwrapper>
        <Spinner size={60} />
      </Loaderbgwrapper>
    );

  return <>{children}</>;
};

export default ProtectedRoute;
