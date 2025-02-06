import ProtectedRoute from '@/components/container/Protectedroute'
import React from 'react'

const page = () => {
  return (
   <ProtectedRoute>
        <h1>
        welcome to dashboard
        </h1>
        </ProtectedRoute>
  )
}

export default page