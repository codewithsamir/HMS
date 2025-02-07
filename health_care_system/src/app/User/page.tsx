"use client"
import ProtectedRoute from '@/components/container/Protectedroute'
import { Button } from '@/components/ui/button';
import { useLogoutUserMutation } from '@/store/authSlice';
import { useRouter } from 'next/navigation';


import React from 'react'

const page = () => {
  const [logoutUser] = useLogoutUserMutation();
  const router = useRouter()
  return (
   <ProtectedRoute>
        <h1>
        welcome to dashboard
        </h1>
        <Button
        onClick={()=>{
          logoutUser().unwrap().then((data)=>router.push("/"))
        }}
        >logout</Button>
        </ProtectedRoute>
  )
}

export default page