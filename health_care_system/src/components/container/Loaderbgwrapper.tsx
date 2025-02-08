import React from 'react';
import { Skeleton } from '../ui/skeleton';

const Loaderbgwrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
   

    <div className="relative flex items-center justify-center min-h-[100vh] bg-white bg-[url('/bg3.jpg')] w-full bg-cover">
      {/* Blue overlay */}
      <Skeleton className="absolute top-0 left-0 right-0 bottom-0 bg-blue-500 " />
      
      {children}
    </div>
    </>
  );
};

export default Loaderbgwrapper;
