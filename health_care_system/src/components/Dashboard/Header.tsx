"use client"
import React from 'react'

import { MdDashboardCustomize } from 'react-icons/md'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '../ui/button'

const Header = ({logo,setsidebarstate,sidebarstate}:any) => {

const route = useRouter()

  return (
    <header className=' sticky top-0 z-[999] py-4 px-2 sm:px-8 md:px-16 bg-blue-600 flex justify-between items-center '>
        <div className="logo flex items-center gap-5">
        <MdDashboardCustomize className='lg:hidden cursor-pointer text-white text-4xl  '
        onClick={()=>setsidebarstate(!sidebarstate)}
        />
            <h2 className='text-white text-lg  md:text-2xl font-bold'>{logo} Dashbaord</h2>
        </div>
        <Button variant="outline" onClick={()=>{ 
          toast.success("Successfully Logout ")
          route.push("/")}}>
            logout</Button>
    </header>
  )
}

export default Header