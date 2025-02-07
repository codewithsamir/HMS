"use client";
import React, { useEffect } from 'react';
import {  useGetUserQuery } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import Spinner from '../ui/spinner';
import Bgwrapper from './BgWrapper';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { data, isLoading, error } = useGetUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        router.replace(`/${role}/Dashboard`);
      } else {
        console.error('Authentication error:', error);
        router.push(`/Login/${role}`);
      }
    }
  }, [isLoading, data, error, router, role]);

  if (isLoading) {
    return (
    
        <Bgwrapper>
          <Spinner size={80} className="border-red-500" />
        </Bgwrapper>
     
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
