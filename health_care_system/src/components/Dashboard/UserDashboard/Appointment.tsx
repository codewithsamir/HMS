"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Doctorprofile from "./Doctorprofile";
import { useDoctorStore } from "@/store/Doctor";
import { useAppointmentStore } from "@/store/Appointment";
import Spinner from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const formSchema = z.object({
  appointment_reason: z.string().min(2, {
    message: "Appointment reason must be at least 2 characters.",
  }),
  appointment_date: z.string().min(2, {
    message: "Please select a valid date.",
  }),
  appointment_time: z.string().min(2, {
    message: "Please select a valid time.",
  }),
});

const Appointment = () => {
  const [selectdoctor, setselectdoctor] = useState<string>("");
  const { Alldoctor, fetchDoctors } = useDoctorStore();
  const { bookAppointment } = useAppointmentStore();
  const [loading, setloading] = useState<boolean>(false);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appointment_reason: "",
      appointment_date: "",
      appointment_time: "",
    },
  });

  useEffect(() => {
    const loadDoctors = async () => {
      await fetchDoctors();
    };
    loadDoctors();
  }, []);

  // Filter doctors based on searchTerm (name or specialization)
  const filteredDoctors =
    Alldoctor?.filter((doctor: any) => {
      const term = searchTerm.toLowerCase();
      return (
        doctor.name.toLowerCase().includes(term) ||
        doctor.specialization.toLowerCase().includes(term)
      );
    }) || [];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setloading(true);
    // Convert appointment_date to an ISO string before sending.
    const isoDate = new Date(values.appointment_date).toISOString();

    const data = await bookAppointment({
      ...values,
      appointment_date: isoDate,
      doctor_id: selectdoctor,
    });

    if (data) {
      setloading(false);
      form.reset();
      setPopupOpen(true);
    }
  }

  // Handler for the search form
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The searchTerm state is already updated onChange,
    // so nothing additional is needed here.
  };

  return (
    <div className="pt-10 w-full flex items-center justify-center">
      {!selectdoctor && (
        <div className="doctor_filter relative h-[80vh] border-2 w-[80%] m-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="searchbox flex w-full items-center space-x-2 p-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or specialization"
              className="text-black bg-white focus-visible:ring-0 w-full"
            />
            <Button type="submit" className="w-[200px]">
              Search
            </Button>
          </form>

          {/* Display Doctor Profiles */}
          <div className="display flex flex-wrap justify-center items-center py-6 gap-4">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((data: any, index: number) => (
                <div className="p-2" key={index}>
                  <Doctorprofile data={data} setselectdoctor={setselectdoctor} />
                </div>
              ))
            ) : (
              <p className="text-black">No doctors found.</p>
            )}
          </div>
        </div>
      )}

      {selectdoctor && (
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg w-full sm:w-[450px] relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-white">
                Book an Appointment
              </h2>

              {/* Appointment Reason */}
              <FormField
                control={form.control}
                name="appointment_reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Appointment Reason
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter appointment reason"
                        {...field}
                        className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Appointment Date */}
              <FormField
                control={form.control}
                name="appointment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Appointment Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        placeholder="Select Date"
                        className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Appointment Time */}
              <FormField
                control={form.control}
                name="appointment_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Appointment Time
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 17 }, (_, i) => {
                            const hour = 9 + Math.floor(i / 2);
                            const minute = i % 2 === 0 ? "00" : "30";
                            const period = hour < 12 ? "AM" : "PM";
                            const displayHour = hour > 12 ? hour - 12 : hour;
                            const time = `${displayHour}:${minute} ${period}`;
                            return (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={loading}
                type="submit"
                className="bg-white text-black hover:bg-red-500 w-full"
              >
                {loading ? <Spinner /> : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      )}

      {/* Custom Popup Message */}
      {popupOpen && (
        <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Appointment Scheduled</DialogTitle>
              <DialogDescription>
                Your appointment has been successfully scheduled.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setPopupOpen(false)}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Appointment;
