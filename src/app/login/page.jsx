'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'

const page = () => {
    const userRef = useRef()
    const errRef = useRef()

    // const {setLogout, login, setLogin} = useCrud()

    const [email, setEmail] = useState('')

    const [pass, setPass] = useState('')

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus();
    }, [])

    // const handleSubmit = async(e) => {
    //   e.preventDefault()
    //   signInWithEmailAndPassword(database, email, pass).then(data => {console.log('authdata',data)
    //   setLogout(false)
    //   console.log('login true')
    //   setLogin(true)
    //   console.log('login : ', login)
    //   localStorage.setItem("user", JSON.stringify(login));
    //   history('/home')
    //   })
    //   .catch(err => {
    //     setErrMsg(err.message)
    //   })
    //   }

  return (
    <div className='h-[85%] flex justify-center items-center'>
    <form className='bg-black text-white h-fit w-1/4 p-5'>
        <p ref={errRef} className={errMsg ? 'text-red-500' : 'hidden'}>{errMsg}</p>
        <h1 className='text-2xl font-semibold'>Login</h1>
        <br/>
        <div>
            <label htmlFor='email'>Email Id: </label><br />
            <input id='usrname' type='email' ref={userRef} className='w-full rounded-md text-black box-border pl-1' value={email} autoComplete='on'
            onChange={(e) => {setEmail(e.target.value)
                setErrMsg('')
            }}></input>
        </div>
        <br/>
        <div>
            <label htmlFor='pwd'>Password:</label><br />
            <input id='pwd' type='password' className='w-full rounded-md text-black box-border pl-1' value={pass} autoComplete='off'
            onChange={(e) => {setPass(e.target.value)
                setErrMsg('')
            }}></input>
        </div>
        <br/>
        <div>
            <button className= 'bg-white w-full text-black p-1 rounded-md'>Login</button>
        </div>
        <br/>
        <div>
            <p>New User?</p>
            <p className='text-blue-500 flex justify-between'><u><Link href={'/register'}>Register Here</Link></u><u><Link href={'/forgot'}>Forgot Password</Link></u></p>
        </div>
    </form>
    </div>
  )
}

export default page
