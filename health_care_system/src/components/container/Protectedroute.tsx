"use client"
import React, { useEffect } from 'react';
import { useGetUserQuery } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import Spinner from '../ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}


const ProtectedRoute = ({ children,role="" }: ProtectedRouteProps) => {
  const { data, isLoading ,error} = useGetUserQuery();
  // const {data:googleuser,isLoading:googleloading} = useGetUserByGoogleQuery()
  const router = useRouter();

  useEffect(() => {
    // When loading is complete, check if user data exists.
    if (!isLoading) {
      if (!data ) {
        // Redirect unauthenticated users to the login page.
        router.push(`/Login/${role}`);
      }
     
      else {
        router.push('/User');
      }
    }
    // console.log(data,isLoading,error)
  }, [data, isLoading, router,error]);

  // Optionally, show a loading indicator while checking authentication status.
  if (isLoading) {
    return  (
        <div className="flex justify-center items-center h-screen bg-white">
      <Spinner size={40} className="border-red-500" />
    
    </div>
    )
  }

 

  // If user data exists, render the protected content.
  // Note: If the user is unauthenticated, the component will redirect before rendering children.
  return <>{children}</>;
};

export default ProtectedRoute;
