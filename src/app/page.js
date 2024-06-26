'use client'
import React from 'react'
import Navbar from "@/_components/Navbar";
import UserNavbar from '@/_components/UserNavbar';

export default function Home() {

  return (
    <div className="flex h-full w-full">
      <div className="w-[15%]">
        <Navbar />
      </div>
      <div className="w-full">
        <UserNavbar />
        <h1>Personal Finance</h1>
      </div>
    </div>
  )
}