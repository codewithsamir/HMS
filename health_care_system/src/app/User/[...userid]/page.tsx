"use client";

import Appointment from '@/components/Dashboard/UserDashboard/Appointment';
import Dashboard from '@/components/Dashboard/UserDashboard/dashboard';
import Myinfo from '@/components/Dashboard/UserDashboard/Myinfo';
import { Button } from '@/components/ui/button';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = ({params}:{params:{userid:string}}) => {
  const [userid,setuserid] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const user = async ()=>{
      const {userid} = await params;
      setuserid(userid[0]);
    }
    user();
    console.log("userid",userid);
  }, [params])
  
 

useEffect(() => {
  console.log("userid",userid);
}, [userid])

  return (
    <>
       {userid === "Dashboard" && <Dashboard />}
       {userid === "Appointment" && <Appointment />}
       {userid === "Myinfo" && <Myinfo />}
    
    </>
  );
};

export default Page;
