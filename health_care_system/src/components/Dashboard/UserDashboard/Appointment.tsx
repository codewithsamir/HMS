"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaClock, FaPen } from "react-icons/fa";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { DatePickerDemo } from "@/components/datepicker";
import Image from "next/image";
import Doctorprofile from "./Doctorprofile";
import { useDoctorStore } from "@/store/Doctor";
import { useAppointmentStore } from "@/store/Appointment";
import Spinner from "@/components/ui/spinner";



const formSchema = z.object({
  appointment_reason: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  appointment_date: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  appointment_time: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})



const Appointment = () => {
  const [selectdoctor, setselectdoctor] = useState<string>("")
  const {Alldoctor,fetchDoctors} = useDoctorStore()
  const {bookAppointment} = useAppointmentStore()
  const [loading, setloading] = useState<boolean>(false)
  
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        appointment_reason: "",
        appointment_date: "",
        appointment_time: "",
      },
    })


    useEffect(()=>{
      const doctordata = async()=>{
         await fetchDoctors()
        
      }
      doctordata()

    },[])


    // doctorid: "",
    // patient_id: "",
    // status: "confirm",

   // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
    setloading(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    const data = await bookAppointment({...values, doctor_id: selectdoctor})
    if(data){
      setloading(false)
    }
  }


  return (
    <div className="pt-10 w-full  flex items-center justify-center">
  

      {!selectdoctor
        && 

        <div className="doctor_filter relative h-[80vh] border-2 w-[80%] m-auto">
        <div className="searchbox flex w-full  items-center space-x-2">
          <Input  placeholder="Search Doctor Related issue" className="text-black bg-white focus-visible:ring-0 w-full" />
          <Button type="submit" className="w-[200px]">Search</Button>
        </div>
        <div className="display flex justify-center items-center py-6">

          
          {Alldoctor &&
          
          
          Alldoctor.map((data:any, index) => {
             return <div className="p-2" key={index + 1}>
                <Doctorprofile  data={data} setselectdoctor={setselectdoctor} />
              </div>
})}
        </div>
      </div>
      }

      {selectdoctor && 
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg w-full sm:w-[450px] relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-white">Book an Appointment</h2>
  
              {/* Appointment Reason */}
              <FormField
                  control={form.control}
                  name="appointment_reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">appointment_reason</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="appointment_reason"
                          {...field}
                          className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                        
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               Appointment Date
              <FormField control={form.control} name="appointment_date" render={({ field }) => (
                <FormItem >
                  <FormLabel className="text-white">Appointment Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" placeholder="Date" className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} /> 
              
  

  
              {/* Appointment Time */}
              <FormField control={form.control} name="appointment_time" render={({ field }) => (
                <FormItem  >
                  <FormLabel className="text-white">Appointment Time</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent >
                     
                        {Array.from({ length: 17 }, (_, i) => {
                          const hour = 9 + Math.floor(i / 2);
                          const minute = i % 2 === 0 ? "00" : "30";
                          const time = `${hour}:${minute} ${hour < 12 ? "AM" : "PM"}`;
                          return (
                            <SelectItem  key={time} value={time}>
                              {time}
                            </SelectItem>
                          );
                        })}
                       
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
  
            
            
  
              <Button 
              disabled={loading}
              type="submit" className="bg-white text-black hover:bg-red-500 w-full">
                
                {loading ? <Spinner/> : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      }
    </div>
  );
};

export default Appointment;
