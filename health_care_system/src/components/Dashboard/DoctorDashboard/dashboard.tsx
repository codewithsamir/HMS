"use client"
import { useEffect, useState } from "react";

import InfoCard from "../Infocard";

import { FaCalendarAlt, FaClipboardList, FaCheckCircle, FaTimesCircle, FaUserPlus, FaCalendarDay, FaDollarSign } from 'react-icons/fa';


import { useAppointmentStore } from "@/store/Appointment";
import Appointmentdata from "./Appointmentdata";




const Dashboard = () => {
  // const [date, setDate] = useState<Date | undefined>(new Date())
  const {doctorappointment,fetchAppointmentsfordoctor,getAppointmentSummary} = useAppointmentStore()

  useEffect(()=>{
    const data = async ()=>{
      await fetchAppointmentsfordoctor()
    }
    data()

  },[fetchAppointmentsfordoctor])


  useEffect(() => {
    console.log("appointments",doctorappointment);
  },[doctorappointment])

  

  const cardDates = getAppointmentSummary();

// Calculate total appointments as the sum of upcoming and completed
const totalAppointments =
  cardDates ? cardDates.totalUpcoming + cardDates.totalCompleted : 0;

const cardData = [
  {
    icon: <FaClipboardList className="text-green-500" />,
    title: 'Total Appointments',
    content: cardDates.total, // Example: Total appointments (upcoming + completed)
  },
  {
    icon: <FaCalendarAlt className="text-blue-500" />,
    title: 'Upcoming Appointments',
    content: cardDates.totalUpcoming, // Example: Upcoming appointments
  },
  {
    icon: <FaCheckCircle className="text-orange-500" />,
    title: 'Completed Appointments',
    content: cardDates.totalCompleted, // Example: Completed appointments
  },
  // {
  //   icon: <FaTimesCircle className="text-red-500" />,
  //   title: 'Cancelled Appointments',
  //   content: 5, // Example: Cancelled appointments
  // },
  // {
  //   icon: <FaUserPlus className="text-purple-500" />,
  //   title: 'New Patients',
  //   content: 8, // Example: New patients this month
  // },
  // {
  //   icon: <FaCalendarDay className="text-teal-500" />,
  //   title: "Today's Appointments",
  //   content: 3, // Example: Appointments for today
  // },

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
      <Appointmentdata
        appointments={doctorappointment}
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