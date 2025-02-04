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
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Header from "@/components/Landingpage/Header";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export default function ForgotPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

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
              <h2 className="text-2xl font-bold text-center text-white capitalize">Forgot Password</h2>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                        icon1={<FaEnvelope size={20} color="white" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-white text-black hover:bg-red-500 hover:text-white w-full">Reset Password</Button>
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
