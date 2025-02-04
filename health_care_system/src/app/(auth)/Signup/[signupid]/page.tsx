"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Bgwrapper from "@/components/container/BgWrapper"
import { FaEye, FaEyeSlash, FaGoogle, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/components/Landingpage/Header"

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function UserSignup({params}:{params:Promise<{signupid:string}>}) {
   const [signupid, setsignupid] = useState<string | null>(null);
 useEffect(()=>{
 const getparam = async ()=>{
   const { signupid } = await params; // Unwrap params
   setsignupid(signupid);
 }
 getparam()
 },[params])
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
              <h2 className="text-2xl font-bold text-center text-white capitalize">{signupid} Signup</h2>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit" className="bg-white text-black hover:bg-red-500 hover:text-white w-full">Signup</Button>
            </form>
            <Button className="bg-black w-full px-4 py-5 rounded-lg shadow-md text-white hover:bg-red-500 hover:text-white">
              <FaGoogle size={20} color="white" /> Signup with Google
            </Button>
            <div className="flex justify-center items-center flex-col text-sm text-white">
              Already have an account? <Link href={`/Login/${signupid}`} className="text-white underline hover:text-red-500">Login</Link>
            </div>
          </Form>
        </div>
      </Bgwrapper>
    </>
  );
}
