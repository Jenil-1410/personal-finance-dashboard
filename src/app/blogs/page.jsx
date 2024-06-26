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
        <h1>Blogs</h1>
      </div>
    </div>
  )
}

export default page
