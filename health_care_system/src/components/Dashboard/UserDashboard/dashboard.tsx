"use client"
import { useState } from "react";
import AppointmentsTable from "./Appointmenttable";
import InfoCard from "../Infocard";

import { FaCalendarAlt, FaEnvelopeOpenText, FaClipboardList } from 'react-icons/fa';
import { Calendar } from "@/components/ui/calendar";



const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState([
    { id: 'A001', doctor: 'Dr. Smith', date: '2025-02-10', status: 'Scheduled' },
    { id: 'A002', doctor: 'Dr. Johnson', date: '2025-02-12', status: 'Completed' },
    // Add more appointments as needed
  ]);

  const cardData = [
    {
      icon: <FaCalendarAlt className="text-blue-500" />,
      title: 'Upcoming Appointments',
      content: 2, // Example count
    },
    {
      icon: <FaClipboardList className="text-green-500" />,
      title: 'Total Appointments',
      content: 10, // Example count
    },
    {
      icon: <FaEnvelopeOpenText className="text-orange-500" />,
      title: 'Messages from Doctor',
      content: 3, // Example count
    },
  ];

  const handleEdit = (id: string) => {
    // Implement edit functionality here
    console.log(`Edit appointment with ID: ${id}`);
  };

  

  
  return (
    <div className='min-h-screen relative w-full overflow-x-scroll  p-4  rounded-md bg-blue-200'>
    

    <div className="grid grid-cols-1  sm:grid-cols-3 gap-2  md:gap-4 py-6">
      {cardData.map((card, index) => (
        <InfoCard
          key={index}
          icon={card.icon}
          title={card.title}
          content={card.content}
        />
      ))}
    </div>
    <div>
      <AppointmentsTable
        appointments={appointments}
        onEdit={handleEdit}
    
      />
    </div>
    <div className="calender flex justify-center py-6">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow  bg-white"
    />
    </div>
    </div>
  )
}

export default Dashboard