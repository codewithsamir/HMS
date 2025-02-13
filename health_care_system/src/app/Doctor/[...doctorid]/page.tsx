"use client";

import Appointment from '@/components/Dashboard/DoctorDashboard/appointment';
import Dashboard from '@/components/Dashboard/DoctorDashboard/dashboard';
import Doctorinfo from '@/components/Dashboard/DoctorDashboard/doctorinfo';
import Patientdata from '@/components/Dashboard/DoctorDashboard/Patientdata';
import Myinfo from '@/components/Dashboard/UserDashboard/Myinfo';
import { Button } from '@/components/ui/button';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = ({params}:{params:{userid:string}}) => {
  const [userid,setuserid] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const user = async ()=>{
      const {doctorid} = await params;
      setuserid(doctorid[0]);
    }
    user();
    // console.log("userid",userid);
  }, [params])
  
 

useEffect(() => {
  console.log("userid",userid);
}, [userid])

  return (
    <>
       {userid === "Dashboard" && <Dashboard />}
       {userid === "Appointment" && <Appointment />}
       {userid === "Patient" && <Patientdata/>}
       {userid === "Myinfo" && <Doctorinfo />}
    
    </>
  );
};

export default Page;
