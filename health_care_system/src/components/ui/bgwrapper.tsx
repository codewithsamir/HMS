import React from 'react';
import Spinner from './spinner'; // Assuming Spinner is in the same folder or adjust the path

const Bgwrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-[100vh] bg-white bg-[url('/bg1.jpg')] w-full bg-cover">
      {children}
    </div>
  );
};

const LoadingComponent = () => {
  return (
    <Bgwrapper>
      <Spinner size={80} className="border-red-500" />
    </Bgwrapper>
  );
};

export default LoadingComponent;
