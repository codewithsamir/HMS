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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
      setLoading(false);
    };

    if (!hydrated) return;
    // if(!user) return;
    fetchUser();
    console.log("it p ",user,hydrated)
  }, [getUser, hydrated]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/Login/${role}`);
    } else if (!loading && role && user?.prefs?.role !== role) {
      // router.push("/unauthorized");
    }
  }, [user, role, loading, router]);

  
  if (loading || !hydrated) return <Loaderbgwrapper>
  <Spinner size={60} />
  </Loaderbgwrapper>;

  return <>{children}</>;
};

export default ProtectedRoute;
