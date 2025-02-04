"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Bgwrapper from "@/components/container/BgWrapper";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Header from "@/components/Landingpage/Header";
import { useState } from "react";

const formSchema = z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters." })
});

export default function updatePassword() {

    const [showPassword, setShowPassword] = useState(true);
      const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword:""
    },
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Header />
      <Bgwrapper>
        <div className="w-full max-w-md px-4 py-6 sm:p-8 space-y-6 bg-blue-500 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-white capitalize">Change Password</h2>
               <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Password</FormLabel>
                                <FormControl>
                                  <Input placeholder="Password" type={showPassword ? "password" : "text"} {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                                    icon2={showPassword ? <FaEye color="white" size={20} onClick={toggleShowPassword} /> : <FaEyeSlash color="white" size={20} onClick={toggleShowPassword} />} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Confirm Password</FormLabel>
                                <FormControl>
                                  <Input placeholder="Confirm Password" type={showConfirmPassword ? "password" : "text"} {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                                    icon2={showConfirmPassword ? <FaEye color="white" size={20} onClick={toggleShowConfirmPassword} /> : <FaEyeSlash color="white" size={20} onClick={toggleShowConfirmPassword} />} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
              <Button type="submit" className="bg-white text-black hover:bg-red-500 hover:text-white w-full">submit</Button>
              <div className="flex justify-center items-center flex-col text-sm text-white">
                <Link href="/" className="text-white underline hover:text-red-500">Back to Login</Link>
              </div>
            </form>
          </Form>
        </div>
      </Bgwrapper>
    </>
  );
}
