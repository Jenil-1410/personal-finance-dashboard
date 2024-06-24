'use client'
import React from 'react'

const page = () => {
  return (
    <div className='m-2 w-auto'>
        <div className='w-[68%] left-[15%] right-0 mx-auto flex justify-center absolute top-2'>
            <input type='search' className='flex h-9 w-full rounded-md border-[0.5px] border-gray-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 md:w-[100px] lg:w-[300px]' placeholder='Search...'></input>
        </div>
        <div className='p-2 border-[0.5px] border-gray-700 h-auto'>
            <h1 className='text-4xl font-bold'>Dashboard</h1>
        </div>
    </div>
  )
}

export default page
