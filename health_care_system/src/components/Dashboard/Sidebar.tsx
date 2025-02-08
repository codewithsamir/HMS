"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Button } from '../ui/button'


const Sidebar = ({menu,page,sidebarstate,setsidebarstate}:any) => {
 
  const pathname = usePathname()
  const path = pathname.split("/")[2]
  // console.log(path)


  const [activebtn, setactivebtn] = useState(path)


// console.log(sidebarstate)
  useEffect(()=>{
    setactivebtn(path)
  },[path])
  
  return (
    <aside className={`bg-blue-400 transition-all   min-h-[92vh]  overflow-hidden  sticky top-[65px]
    ${sidebarstate ? "w-0" : "w-[220px]"}
     lg:w-[220px]`}>
      <IoClose  className='lg:hidden cursor-pointer text-4xl absolute right-2 top-2 text-white'
      onClick={()=>setsidebarstate(!sidebarstate)}
      />
        <div className='flex flex-col py-12 lg:py-5   w-full items-center gap-4  '>
       {menu && menu.map((menu:any)=>
     <Link href={`/${page}/${menu.name}`} key={menu.name}>   <Button className={`text-md flex gap-6 items-center justify-start  text-white ${menu.name === activebtn ? "bg-blue-700": "bg-blue-500"}  w-[170px] p-2 border-none rounded-md hover:bg-blue-700 `} >{menu.icon} {menu.name}</Button></Link>
       )}
       </div>
       
    </aside>
  )
}

export default Sidebar