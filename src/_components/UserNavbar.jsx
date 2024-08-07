import React from 'react'
import Link from "next/link";
import { signOut } from 'firebase/auth';
import { auth } from '@/FirebaseConfig';
import { useFirebase } from '@/features/FirebaseContext';
import { useRouter } from 'next/navigation';

const UserNavbar = ({}) => {

    const { loggedIn, usrData } = useFirebase();
    const router = useRouter();

    const handleSignOut = async() => {
        var alrt = window.confirm('Are you sure you want to log out?');
        if(alrt === true){
          document.cookie = 'userToken=; Max-Age=0; path=/;';
          await signOut(auth)
          router.push('/')
        }
        else{
          return
        }
    }

  return (
    <div className='mb-2 p-2 w-auto flex items-center justify-between'>
        {
        loggedIn ? <pre>Hello {usrData.first_name} {usrData.last_name}
                        <p className='text-sm italic'>Nice to see you...</p>
                    </pre> : 
                    <pre>Hello User</pre>
        }
        {
            loggedIn && (
            <button className='rounded-md border-[0.5px] border-gray-700 p-1 z-10' onClick={handleSignOut}>SignOut</button>
            )
        }
        {
            !loggedIn && (
            <Link href={'/register'}>
                <button className='rounded-md border-[0.5px] border-gray-700 p-1 z-10'>SignUp/SignIn</button>
            </Link>
            )
        }
    </div>
  )
}

export default UserNavbar