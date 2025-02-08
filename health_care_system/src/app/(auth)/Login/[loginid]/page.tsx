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
import { useAuthStore } from "@/store/Auth";
import Spinner from "@/components/ui/spinner";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),

});

export default function UserLogin({params}:{params:{loginid:string}}) {
  const [loginid, setloginid] = useState<string>("");
const {loginUser,loginWithGoogle} = useAuthStore()
const [loading,setloading] =  useState<boolean>(false)
 
  const router = useRouter();

  useEffect(() => {
    const getrole = async () => {
      const {loginid} = await params;
      setloginid(loginid)
    };
    getrole();
  
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
  const onSubmit =async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setloading(true)
   const loginResponse = await  loginUser(values.email, values.password)
    if(loginResponse.success){
      toast.success("Login Successful")
      router.push("/User/Dashboard")
      setloading(false)
  }else{
    toast.error(loginResponse.error?.message)
    setloading(false)

    }
  }
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
                  disabled={loading}
                >
                  {loading ? <Spinner/> :  "Submit"}
                </Button>
              </form>

              <Button
               onClick={async()=>{
               await loginWithGoogle(loginid)
               
               }}
               disabled={loading}
                className="bg-black w-full max-w-md px-4 py-5 rounded-lg shadow-md text-white hover:bg-red-500 hover:text-white"
          
              >
                <FaGoogle size={20} color="white" />
                Login with Google
              </Button>

              <div className="flex justify-center items-center flex-col text-sm text-white">
                If you donot have an account,{" "}
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

