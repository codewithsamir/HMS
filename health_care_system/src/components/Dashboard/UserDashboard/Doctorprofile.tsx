import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Doctorprofile = ({data,setselectdoctor}:any) => {
  return (
    <div>
        <Card className="w-[350px]">
          <CardHeader>
       <Image src={data.imageUrl || "king.jpg"} width={200} height={150} alt="doctor profile" className="w-full"/>
     
      <CardTitle className="py-1">{data.name}</CardTitle>
      <CardDescription className="py-1">
       {data.specialization}
       {data.experience}
        </CardDescription>
      <Button onClick={()=>setselectdoctor(data.$id)} className="w-full">Select</Button>
      </CardHeader>
    
    
          </Card>
    </div>
  )
}

export default Doctorprofile