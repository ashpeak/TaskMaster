import React from 'react';
import Link from 'next/link';

const Page: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen dark:text-white dark:bg-accent'>
      <h1 className='text-4xl'>404 | Page not found</h1>
      {/* Go back */}
      <div className='p-4 flex'>
        <p className='text-lg'>Go back to the</p>
        <Link href={'/'} className='ml-2 text-blue-500 underline'>Home</Link>
      </div>
    </div>
  )
}

export default Page