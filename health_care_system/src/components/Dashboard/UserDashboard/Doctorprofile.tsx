import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Doctorprofile = ({data}:any) => {
  return (
    <div>
        <Card className="w-[350px]">
          <CardHeader>
       <Image src="/bg1.jpg" width={200} height={150} alt="doctor profile" className="w-full"/>
     
      <CardTitle className="py-1">Create project</CardTitle>
      <CardDescription className="py-1">
        Deploy your new project in one-click.
        Deploy your new project in one-click.
        Deploy your new project in one-click.
        Deploy your new project in one-click.
        </CardDescription>
      <Button  className="w-full">Select</Button>
      </CardHeader>
    
    
          </Card>
    </div>
  )
}

export default Doctorprofile