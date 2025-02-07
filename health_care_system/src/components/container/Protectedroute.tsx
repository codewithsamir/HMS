"use client";
import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import Spinner from '../ui/spinner';
import Bgwrapper from './BgWrapper';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const router = useRouter();

  

  return <>{children}</>;
};

export default ProtectedRoute;
