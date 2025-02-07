"use client";

import ProtectedRoute from '@/components/container/Protectedroute';
import { Button } from '@/components/ui/button';
import { useGetUserQuery, useLogoutUserMutation, useSetRoleMutation } from '@/store/authSlice';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

const Page: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  const [logoutUser] = useLogoutUserMutation();
  const [setRole] = useSetRoleMutation();
  const { data } = useGetUserQuery();

  console.log(data);

  return (
    <ProtectedRoute >
      <h1>Welcome to the dashboard</h1>
      <Button
        onClick={() => {
          logoutUser().unwrap().then(() => router.push("/"));
        }}
      >
        Logout
      </Button>
      {data?.user && (
        <>
          <h2>{data.user.$id}</h2>
          <h2>{data.user.email}</h2>
        </>
      )}
    </ProtectedRoute>
  );
};

export default Page;
