"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { useByGoogleMutation, useLoginUserMutation } from "@/store/authSlice"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
})


export default  function UserLogin({params}:{params: Promise<{ loginid: string }>}){
  const [loginid, setLoginid] = useState<string | null>(null);
  const [loginUser,{ data:loginuser, isLoading:loginloading }] = useLoginUserMutation()
     const [byGoogle,{ data:googledata,  isLoading:googleloading }] =  useByGoogleMutation();
     const router = useRouter()
useEffect(()=>{
const getparam = async ()=>{
  const { loginid } = await params; // Unwrap params
  setLoginid(loginid);
}
getparam()
},[params])
 
  const [showpassword, setshowpassword ] = useState(true)
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })


  
  const updateshowpassword = ()=>{
    
    setshowpassword(!showpassword)
  }
  // ...  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
   loginUser(values);
   if(loginuser){
    router("/User")
   }
  
    
  }

  return (
    <>
    <Header/>
 <Bgwrapper>
  <div className="w-full max-w-md px-4 py-6 sm:p-8 space-y-6 bg-blue-500 rounded-lg shadow-md">
  <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
      <h2 className="text-2xl font-bold text-center text-white capitalize">{loginid} Login</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                
                <Input placeholder="Email" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white " 
                icon1={<FaUser size={20} color="white" />} />
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
              <FormLabel className="text-white">password</FormLabel>
              <FormControl>
                <Input placeholder="password"
                type={showpassword ? "password" : "text"}
                {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white "
                icon2={showpassword ? <FaEye color="white" size={20} onClick={updateshowpassword} /> :<FaEyeSlash color="white" size={20} onClick={updateshowpassword}/> }
                />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="flex justify-center items-center flex-col text-sm text-white"><Link href="/forgotpassword" className="text-white underline hover:text-red-500">Forgot password</Link></p>

        <Button type="submit" className="bg-white text-black hover:bg-red-500 hover:text-white w-full">Submit</Button>

    

      </form>
      <Button 
        onClick={()=>{
          byGoogle()
          if(googledata){
            router("/User")
          }
         
        }}
      className="bg-black w-full max-w-md px-4 py-5  rounded-lg shadow-md text-white hover:bg-red-500 hover:text-white w-full">
        <FaGoogle size={20} color="white"/>
        login with Google</Button>
      <div className="flex justify-center items-center flex-col text-sm text-white">if you haven't already Account then <Link href={`/Signup/${loginid}`} className="text-white underline hover:text-red-500">Signup</Link></div>
    </Form>
  </div>

 </Bgwrapper>
    </>
  )
}
