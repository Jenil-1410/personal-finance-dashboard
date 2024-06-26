'use client'
import React from 'react'
import Navbar from '@/_components/Navbar';
import UserNavbar from '@/_components/UserNavbar';

const page = () => {

  return (
    <div className="flex h-full w-full">
      <div className="w-[15%]">
        <Navbar />
      </div>
      <div className="w-full">
        <UserNavbar />
        <div className='m-2 w-auto'>
          <div className='w-[68%] left-[15%] right-0 mx-auto flex justify-center absolute top-2'>
              <input type='search' className='flex h-9 w-full rounded-md border-[0.5px] border-gray-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 md:w-[100px] lg:w-[300px]' placeholder='Search...'></input>
          </div>
          <div className='p-4 border-[0.5px] border-gray-700 h-auto'>
              <div className='flex justify-between'>
                <h1 className='text-4xl font-bold'>Dashboard</h1>
                <button className='border border-white px-2 rounded'>Add transaction</button>
              </div>
              <div className='text-center text-gray-400'>
                You have not added any transactions.
              </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default page

