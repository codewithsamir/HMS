"use client"
import ProtectedRoute from "@/components/container/Protectedroute";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import { ProfileForm } from "@/components/Dashboard/UserDashboard/Profileform";
import { useUserStore } from "@/store/User";
import { useEffect, useState } from "react";
import { MdDashboard, MdEvent, MdInfo } from "react-icons/md";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const [sidebarstate, setsidebarstate] = useState<boolean>(false)
  
    const {profile,fetchUserProfile} = useUserStore()
   
  const menu = [
    { name: "Dashboard", icon: <MdDashboard /> },
    { name: "Appointment", icon: <MdEvent /> },
    // { name: "Patient", icon: <MdPerson /> },
    { name: "Myinfo", icon: <MdInfo /> },
  ];

  useEffect(()=>{
    const user = async ()=>{
      if(!profile){

        await fetchUserProfile()
      }
    }

    user()
  },[profile,fetchUserProfile])
  
console.log("i",profile)
  return (
    <ProtectedRoute role="User" >
      <Header logo="User" setsidebarstate={setsidebarstate} sidebarstate={sidebarstate}/>
      <div className="flex ">
        <div className="flex-shrink-0 sticky left-0">
          <Sidebar menu={menu} page="User" setsidebarstate={setsidebarstate} sidebarstate={sidebarstate}/>
        
        </div>

      
      
      <div className="py-2 w-full bg-slate-300 flex justify-center items-center relative">
      {!profile  &&
     
  <ProfileForm />


}


{profile &&   children}

      </div>
      
      </div>
    
    </ProtectedRoute>
  );
};

export default Layout;