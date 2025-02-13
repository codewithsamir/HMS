"use client"
import ProtectedRoute from "@/components/container/Protectedroute";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import Doctorform from "@/components/Dashboard/DoctorDashboard/Doctorform";

import { useAuthStore } from "@/store/Auth";

import { useEffect, useState } from "react";
import { MdDashboard, MdEvent, MdInfo } from "react-icons/md";
import { useDoctorStore } from "@/store/Doctor";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const [sidebarstate, setsidebarstate] = useState<boolean>(false)
  
    const {user} = useAuthStore()
    const {profile,fetchDoctorProfile} = useDoctorStore()
   
  const menu = [
    { name: "Dashboard", icon: <MdDashboard /> },
    { name: "Appointment", icon: <MdEvent /> },
    // { name: "Patient", icon: <MdPerson /> },
    { name: "Myinfo", icon: <MdInfo /> },
  ];

  useEffect(()=>{
    const profiledata = async ()=>{
      if(user){
await fetchDoctorProfile()
      }
    }

    profiledata()
  },[profile,fetchDoctorProfile,user])
  
console.log("i",profile)
  return (
    <ProtectedRoute role="
    Doctor" >
      <Header logo="Doctor" setsidebarstate={setsidebarstate} sidebarstate={sidebarstate}/>
      <div className="flex ">
        <div className="flex-shrink-0 sticky left-0">
          <Sidebar menu={menu} page="User" setsidebarstate={setsidebarstate} sidebarstate={sidebarstate}/>
        
        </div>

      
      
      <div className="py-2 w-full min-h-screen relative bg-slate-300 ">
      {!profile  &&
     
  <Doctorform />


}


{profile &&   children}

      </div>
      
      </div>
    
    </ProtectedRoute>
  );
};

export default Layout;