"use client";

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
import { FaEye, FaEyeSlash, FaGoogle, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Landingpage/Header";
import { useByGoogleMutation, useLoginUserMutation } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProtectedRoute from "@/components/container/Protectedroute";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  role: z.enum(['User', 'Doctor', 'Admin'], {
    message: "Role must be one of: admin, user, or doctor.",
  }),
});

export default function UserLogin() {

  const [loginUser, { isLoading: loginloading }] = useLoginUserMutation();
  const [byGoogle, { isLoading: googleloading }] = useByGoogleMutation();
  const router = useRouter();



  const [showpassword, setShowpassword] = useState(true);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "User",
    },
  });
//   console.log(form.control._defaultValues.role)
  const role = form.control._defaultValues.role

  const togglePasswordVisibility = () => {
    setShowpassword((prev) => !prev);
  };

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    loginUser(values)
      .unwrap()
      .then((data:any) => {
        if (data) {
          toast.success("Successfully Login");
          router.push(`/${role}/Dashboard`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <ProtectedRoute >
        <Header />
        <Bgwrapper>
          <div className="w-full max-w-md px-4 py-6 sm:p-8 space-y-6 bg-blue-500 rounded-lg shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h2 className="text-2xl font-bold text-center text-white capitalize"> Login</h2>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                          icon1={<FaUser size={20} color="white" />}
                        />
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
                        <Input
                          placeholder="Password"
                          type={showpassword ? "password" : "text"}
                          {...field}
                          className="placeholder:text-gray-200 focus-visible:ring-0 text-white"
                          icon2={
                            showpassword ? (
                              <FaEye color="white" size={20} onClick={togglePasswordVisibility} />
                            ) : (
                              <FaEyeSlash color="white" size={20} onClick={togglePasswordVisibility} />
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Role</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full text-white focus:ring-0">
                            <SelectValue placeholder="Select a Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="Doctor">Doctor</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="flex justify-center items-center flex-col text-sm text-white">
                  <Link href="/forgotpassword" className="text-white underline hover:text-red-500">
                    Forgot password
                  </Link>
                </p>

                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-red-500 hover:text-white w-full"
                  disabled={loginloading}
                >
                  {loginloading ? "Loading..." : "Submit"}
                </Button>
              </form>

              <Button
                onClick={() => byGoogle()}
                className="bg-black w-full max-w-md px-4 py-5 rounded-lg shadow-md text-white hover:bg-red-500 hover:text-white"
                disabled={googleloading}
              >
                <FaGoogle size={20} color="white" />
                Login with Google
              </Button>

              <div className="flex justify-center items-center flex-col text-sm text-white">
                If you donot have an account,{" "}
                <Link href={`/Signup`} className="text-white underline hover:text-red-500">
                  Signup
                </Link>
              </div>
            </Form>
          </div>
        </Bgwrapper>
      </ProtectedRoute>
    </>
  );
}
