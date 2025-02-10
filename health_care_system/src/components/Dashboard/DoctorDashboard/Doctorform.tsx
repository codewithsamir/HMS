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
import { useUserStore } from "@/store/User"
import { useState } from "react"
import Spinner from "@/components/ui/spinner"
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectContent, SelectGroup, SelectLabel } from "@radix-ui/react-select"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  specialization: z.string().min(10, {
    message: "Specialization must be at least 10 characters.",
  }),
  experience: z.string().min(1, {
    message: "Experience be required for the profile.",
  }),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Age must be a valid number.",
  }),
  gender: z.enum(["male", "female", "other", "Male", "Female", "Other"], {
    message: "Gender must be 'male', 'female', or 'other'.",
  }),
  contact: z
    .string()
    .length(10, { message: "Contact number must be exactly 10 digits." })
    .regex(/^\d+$/, { message: "Contact number must contain only digits." }),
  image: z
    .any()
    .refine((file) => file instanceof File, { message: "File must be an image." }),
})

export default function ProfileForm() {
  const { uploadProfileImage, saveUserProfile } = useUserStore()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      specialization: "",
      experience: "",
      age: "",
      gender: undefined,
      contact: "",
      image: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setLoading(true)
    const { name, specialization, experience, age, gender, contact, image } = values

    // const res = await uploadProfileImage(image)
    // if (res) {
    //   const res2 = await saveUserProfile({
    //     name,
    //     specialization,
    //     experience,
    //     age: Number(age),
    //     gender,
    //     contact,
    //     ...res,
    //   })
    //   if (res2) {
    //     setLoading(false)
    //   }
    // }
  }

  return (
    <div className="w-[500px] mt-10 bg-blue-600 p-5 rounded-md text-white absolute top-[50%] left-[50%] z-40 translate-x-[-50%] translate-y-[-50%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="capitalize text-2xl font-semibold text-center">Fill Up Your Information</h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Specialization" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Experience" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
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
                  <Input placeholder="Enter your Age" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
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
                 
                  <Select  onValueChange={field.onChange} defaultValue={field.value} >
                    <SelectGroup>
                    <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                    <SelectItem value="male">male</SelectItem>
                    <SelectItem value="female">female</SelectItem>
                    <SelectItem value="other">other</SelectItem>
                    </SelectContent>
                    </SelectGroup>
                  </Select>
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
                  <Input placeholder="Enter your Contact Number" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
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
                      const file = event.target.files?.[0]
                      field.onChange(file)
                    }}
                    className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit">
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
