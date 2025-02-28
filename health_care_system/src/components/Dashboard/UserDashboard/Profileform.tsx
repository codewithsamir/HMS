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

// ✅ Updated form schema with proper numeric validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  age: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Age must be a valid number.",
    }),
  gender: z
    .string()
    .refine((val) => ["male", "female", "other", "Male", "Female", "Other"].includes(val), {
      message: "Gender must be 'male', 'female', or 'other'",
    }),
  contact: z
    .string()
    .length(10, { message: "Contact number must be exactly 10 digits." })
    .refine((val) => /^\d+$/.test(val), {
      message: "Contact number must contain only numbers.",
    }),
  image: z.instanceof(File, { message: "File must be an image" }),
})

export function ProfileForm() {
  const { uploadProfileImage, saveUserProfile } = useUserStore()
  const [loading, setLoading] = useState(false)

  // 1. Define the form
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

  // 2. Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const { name, age, gender, contact, image } = values

    const res = await uploadProfileImage(image)
    if (res) {
      const res2 = await saveUserProfile({
        name,
        age: Number(age), // ✅ Convert to Number
        gender,
        contact,
        ...res,
      })
      if (res2) {
        setLoading(false)
      }
    }
  }

  return (
    <div className="w-[500px] bg-blue-600 p-5 rounded-md text-white absolute top-[50%] left-[50%] z-40 translate-x-[-50%] translate-y-[-50%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="capitalize text-2xl font-semibold text-center">Fill Up Your Information</h2>

          {/* Full Name Field */}
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

          {/* Age Field */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/, ""))} // Only allow numbers
                    className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Field */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Gender" {...field} className="placeholder:text-gray-200 focus-visible:ring-0 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Number Field */}
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your Contact Number"
                    {...field}
                    maxLength={10}
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/, ""))} // Only allow numbers
                    className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
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
                      field.onChange(file) // Manually update field value
                    }}
                    className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button disabled={loading} type="submit">
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
