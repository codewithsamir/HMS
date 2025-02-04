import React from 'react'

const Bgwrapper = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="flex items-center justify-center min-h-[92vh] bg-white bg-[url('/bg1.jpg')] w-full bg-cover">
        {children}
    </div>
  )
}

export default Bgwrapper