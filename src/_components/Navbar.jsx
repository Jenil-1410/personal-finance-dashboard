'use client';
import { useFirebase } from '@/features/FirebaseContext';
import { faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const Navbar = () => {
    const currPath = usePathname();
    const { usrData } = useFirebase();
    console.log(usrData.first_name);

  return (
    <div className='w-full h-full bg-white text-black'>
        <div className='h-full flex flex-col'>
            <div className='h-fit flex justify-center'>
                <Image src='/images/App_Logo.png' width={100} height={100} className='h-fit' alt='Finance Fusion' />
                {/* <Image src="/images/App_Logo.png" height={20} width={20} /> */}
            </div>
            <div className='h-[80%] py-8 pr-5 border-y-2 border-gray-300'>
                <Link href={'/'}>
                    <div className= {currPath === '/' ? 'bg-black text-white py-2 pl-5 rounded-r' : 'py-2 pl-5 rounded-r'}>Home</div>
                </Link>
                <Link href={'/about'}>
                    <div className= {currPath === '/about' ? 'bg-black text-white py-2 pl-5 rounded-r' : 'py-2 pl-5 rounded-r'}>About Us</div>
                </Link>
                <Link href={'/blogs'}>
                    <div className= {currPath === '/blogs' ? 'bg-black text-white py-2 pl-5 rounded-r' : 'py-2 pl-5 rounded-r'}>Blogs</div>
                </Link>
                <Link href={`/dashboard/${usrData.first_name}`}>
                    <div className= {currPath === '/dashboard' ? 'bg-black text-white py-2 pl-5 rounded-r' : 'py-2 pl-5 rounded-r'}><FontAwesomeIcon icon={faTableColumns} className='text-sm'/> Dashboard</div>
                </Link>
            </div>
            <div className='h-[15%]'>Themes</div>
        </div>
    </div>
  )
}

export default Navbar
