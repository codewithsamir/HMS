import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaCalendarAlt, FaClock, FaPen } from 'react-icons/fa';
import { z } from 'zod';

// Define the form schema with Zod validation
const formSchema = z.object({
  doctorid: z.string().min(1, { message: 'Doctor ID is required.' }),
  userId: z.string().min(1, { message: 'User ID is required.' }),
  appointment_reason: z.string().min(1, { message: 'Appointment reason is required.' }),
  appointment_date: z.string().min(1, { message: 'Appointment date is required.' }),
  appointment_time: z.string().min(1, { message: 'Appointment time is required.' }),
  status: z.string().min(1, { message: 'Status is required.' }),
  username: z.string().min(1, { message: 'Username is required.' }),
  doctorname: z.string().min(1, { message: 'Doctor name is required.' }),
});

const Appointment = () => {
  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorid: '',
      userId: '',
      appointment_reason: '',
      appointment_date: '',
      appointment_time: '',
      status: 'confirm',
      username: '',
      doctorname: '',
    },
  });

  // Define submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="grid grid-cols-2 p-2 sm:p-10 gap-5 w-full">
      {/* Left Form Section */}
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg w-full relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-white capitalize">Book an Appointment</h2>

          


            {/* Appointment Reason */}
            <FormField control={form.control} name="appointment_reason" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Appointment Reason</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Appointment Reason"
                    {...field}
                    className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                    icon1={<FaPen size={20} color="white" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Appointment Date */}
            <FormField control={form.control} name="appointment_date" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Appointment Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                    icon1={<FaCalendarAlt size={20} color="white" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Appointment Time */}
            <FormField control={form.control} name="appointment_time" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Appointment Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                    icon1={<FaClock size={20} color="white" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Status */}
            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Status</FormLabel>
                <FormControl>
                {/* //select remaining  */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

         

            {/* Doctor Name */}
            <FormField control={form.control} name="doctorname" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Doctor Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doctor's Name"
                    {...field}
                    className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                    icon1={<FaUser size={20} color="white" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-white text-black hover:bg-red-500 hover:text-white w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {/* Right Search Section */}
      <div className="doctor_filter relative h-[80vh] border-2 border-green-500 w-full">
        <div className="searchbox">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Search</Button>
          </div>

          <div className="doctor-card relative">
            {/* Doctor cards or content can go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
