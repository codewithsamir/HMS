"use client";

import Dashboard from '@/components/Dashboard/UserDashboard/dashboard';
import { Button } from '@/components/ui/button';

import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

const Page = ({params}:{params:{userid:string}}) => {
  const router = useRouter();
  const path = usePathname();
 



  return (
    <>
     <Dashboard/>
    </>
  );
};

export default Page;
