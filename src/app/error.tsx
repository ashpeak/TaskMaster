"use client";
import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className='flex justify-center items-center flex-col gap-y-4 h-screen dark:text-white dark:bg-accent'>
      <h1 className='text-3xl font-bold'>{error.message}</h1>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
};

export default Error;