"use client"
import { useEffect, useState } from "react";
import AppointmentsTable from "./Appointmenttable";
import InfoCard from "../Infocard";

import { FaCalendarAlt, FaEnvelopeOpenText, FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import { Calendar } from "@/components/ui/calendar";
import { ProfileForm } from "./Profileform";
import { useAppointmentStore } from "@/store/Appointment";



const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const {appointments,fetchAppointments,getAppointmentSummary} = useAppointmentStore()

  useEffect(()=>{
    const data = async ()=>{
      await fetchAppointments()
    }
    data()

  },[fetchAppointments])

  useEffect(() => {
    console.log("appointments",appointments);
  },[fetchAppointments,appointments])

  

  const cardDates = getAppointmentSummary();

// Calculate total appointments as the sum of upcoming and completed
const totalAppointments =
  cardDates ? cardDates.totalUpcoming + cardDates.totalCompleted : 0;

const cardData = [
  {
    icon: <FaClipboardList className="text-green-500" />,
    title: 'Total Appointments',
    content: totalAppointments, // Sum of upcoming and completed appointments
  },
  {
    icon: <FaCalendarAlt className="text-blue-500" />,
    title: 'Upcoming Appointments',
    content: cardDates ? cardDates.totalUpcoming : 0,
  },
  {
    icon: <FaCheckCircle className="text-orange-500" />,
    title: 'Total Completed',
    content: cardDates ? cardDates.totalCompleted : 0,
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
          key={index + 1}
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
    {/* <div className="calender  ">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow  bg-white"
    />
    </div> */}

    </div>
  )
}

export default Dashboard