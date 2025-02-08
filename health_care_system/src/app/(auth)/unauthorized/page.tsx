// pages/unauthorized.js


import Bgwrapper from '@/components/container/BgWrapper';
import Header from '@/components/Landingpage/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <>
         <Header />
    <Bgwrapper >
      <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-red-500 mb-4">Unauthorized</h1>
        <p className="text-center text-gray-600 mb-4">
          You do not have permission to access this page. Please contact your administrator.
        </p>
        <div className="flex justify-center">
          <Link href="/">
            
              <Button variant="outline" className="px-6 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white">
                Go Home
              </Button>
           
          </Link>
        </div>
      </div>
      </Bgwrapper>
      </>
  );
}
