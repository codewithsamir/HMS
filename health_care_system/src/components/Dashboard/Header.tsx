"use client"
import React from 'react'

import { MdDashboardCustomize } from 'react-icons/md'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useAuthStore } from '@/store/Auth'
import { Avatar, AvatarFallback } from '../ui/avatar'


const Header = ({logo,setsidebarstate,sidebarstate}:any) => {
const {logoutUser,user} = useAuthStore()
console.log(user)
const route = useRouter()

  return (
    <header className=' sticky top-0 z-[999]                                                                                                                                                                                                                                      11q py-4 px-2 sm:px-8 md:px-16 bg-blue-600 flex justify-between items-center '>
        <div className="logo flex items-center gap-5">
        <MdDashboardCustomize className='lg:hidden cursor-pointer text-white text-4xl  '
        onClick={()=>setsidebarstate(!sidebarstate)}
        />
            <h2 className='text-white text-lg  md:text-2xl font-bold'>{logo} Dashbaord</h2>
        </div>
      <div className="last flex gap-2">
      <Button variant="outline" onClick={async()=>{ 
         await logoutUser()
          toast.success("Successfully Logout ")
         
          route.push(`/Login/${logo}`)}}>
            logout</Button>
      <Avatar >
  <AvatarFallback className=' text-white text-3xl bg-blue-950 select-none' >{user && user.name[0]}</AvatarFallback>
</Avatar>
      
      </div>
    </header>
  )
}

export default Header