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
import { databases, storage } from "@/models/client/config"
import { db, ImageBucket, patientinfo } from "@/models/name"
import { ID } from "appwrite"
import { useAuthStore } from "@/store/Auth"
import { toast } from "sonner"
import env from "@/app/env"
import { useUserStore } from "@/store/User"
import { useState } from "react"
import Spinner from "@/components/ui/spinner"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "FullName must be at least 2 characters.",
  }),
  age: z.string().min(1, {
    message: "age must be valid",
  }),
  gender: z.string()
  
  .refine(value => ["male", "female", "other","Male","Female","Other"].includes(value), {
    message: "Gender must be 'male', 'female', or 'other'",
  }),
  contact: z.string().max(10, {
    message: "contact number is required",
  }),
  image: z
    .instanceof(File, { message: "File must be an image" })
    
})

export function ProfileForm() {

  const {uploadProfileImage,saveUserProfile} =  useUserStore()
  const [loading, setloading] =  useState(false)
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      contact: "",
      image: undefined,

    },
  })

  // userid  is required and imageurl 

 // 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof formSchema>) {
  // ✅ This will be type-safe and validated.
  setloading(true)
  const { name, age, gender, contact, image } = values;
  
const res = await uploadProfileImage(image) ;
if(res){
 const res2 = await saveUserProfile({name,age:Number(age),gender,contact,...res}) 
 if(res2){
  setloading(false)
 }
}

}


  return (
   <div className="w-[500px] bg-blue-600 p-5 rounded-md text-white absolute top-[50%] left-[50%] z-40 translate-x-[-50%] translate-y-[-50%] " >
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="capitalize text-2xl font-semibold text-center">Fill Up Your Information</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
              </FormControl>
        
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="Enter your age" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
              </FormControl>
        
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Gender" {...field}  className="placeholder:text-gray-200 focus-visible:ring-0 text-white"/>
              </FormControl>
        
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Contact Number" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white"/>
              </FormControl>
        
              <FormMessage />
            </FormItem>
          )}
        />
     <FormField
  control={form.control}
  name="image"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Upload Image</FormLabel>
      <FormControl>
        <Input
       
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            field.onChange(file); // Manually update field value
          }}
          className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

        <Button disabled={loading} type="submit">
          {loading ?  <Spinner/>    :  "Submit"}
        </Button>
      </form>
    </Form>
   </div>
  )
}
