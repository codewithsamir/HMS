"use client"
import React, { useEffect } from 'react';
import { useGetUserQuery } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data, isLoading } = useGetUserQuery();
  const router = useRouter();

  useEffect(() => {
    // When loading is complete, check if user data exists.
    if (!isLoading) {
      if (!data) {
        // Redirect unauthenticated users to the login page.
        router.push('/');
      }
      // If needed, you can handle redirection for authenticated users here.
      // For example, if you want to redirect authenticated users to a specific page,
      // you can uncomment the following code:
      //
      else {
        router.push('/User');
      }
    }
    console.log(data,isLoading)
  }, [data, isLoading, router]);

  // Optionally, show a loading indicator while checking authentication status.
  if (isLoading) {
    return <div>Loading...</div>;
  }

 

  // If user data exists, render the protected content.
  // Note: If the user is unauthenticated, the component will redirect before rendering children.
  return <>{children}</>;
};

export default ProtectedRoute;
