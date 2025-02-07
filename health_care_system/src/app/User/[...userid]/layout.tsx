"use client"
import ProtectedRoute from "@/components/container/Protectedroute";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import { useState } from "react";
import { MdDashboard, MdEvent, MdInfo } from "react-icons/md";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const [sidebarstate, setsidebarstate] = useState<boolean>(false)
  const menu = [
    { name: "Dashboard", icon: <MdDashboard /> },
    { name: "Appointment", icon: <MdEvent /> },
    // { name: "Patient", icon: <MdPerson /> },
    { name: "Myinfo", icon: <MdInfo /> },
  ];
  

  return (
    <ProtectedRoute >
      <Header logo="User" setsidebarstate={setsidebarstate} sidebarstate={sidebarstate}/>
      <div className="flex ">
        <div className="flex-shrink-0 ">
          <Sidebar menu={menu} page="User" setsidebarstate={setsidebarstate} sidebarstate={sidebarstate}/>
        
        </div>

      
        {children}
      </div>
    
    </ProtectedRoute>
  );
};

export default Layout;