"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useByGoogleMutation, useLoginUserMutation, useLogoutUserMutation } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProtectedRoute from "@/components/container/Protectedroute";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function UserLogin({ params }: { params: Promise<{ loginid: string }> }) {
  const [loginid, setLoginid] = useState<string>("");
  const [loginUser, { data: logindata, isLoading: loginloading }] = useLoginUserMutation();
  const [byGoogle, { data: googledata, isLoading: googleloading }] = useByGoogleMutation();
  const router = useRouter();

  
  useEffect(() => {
    const getparam = async () => {
      const { loginid } = await params; // Unwrap params
      setLoginid(loginid);
    };
    getparam();
  }, [params]);

  const [showpassword, setShowpassword] = useState(true);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowpassword((prev) => !prev);
  };

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginUser(values)
      .unwrap()
      .then((data) => {
        if (data) {
          toast.success("Successfully Login")
          router.push("/User");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
    <ProtectedRoute role={loginid}>
      <Header />
      <Bgwrapper>
        <div className="w-full max-w-md px-4 py-6 sm:p-8 space-y-6 bg-blue-500 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-white capitalize">{loginid} Login</h2>
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
              onClick={() =>  byGoogle({role:loginid})}
              className="bg-black w-full max-w-md px-4 py-5 rounded-lg shadow-md text-white hover:bg-red-500 hover:text-white"
              disabled={googleloading}
            >
              <FaGoogle size={20} color="white" />
              Login with Google
            </Button>

            <div className="flex justify-center items-center flex-col text-sm text-white">
              If you don't have an account,{" "}
              <Link href={`/Signup/${loginid}`} className="text-white underline hover:text-red-500">
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
