'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react'

const page = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [usr, setUsr] = useState('')

    const [email, setEmail] = useState('')

    const [pass, setPass] = useState('')

    const [cpass, setCpass] = useState('')
    const [validCpass, setValidCpass] = useState(false)
    const [cpassFocus, setCpassFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
      const match = pass === cpass
      setValidCpass(match)
    }, [pass, cpass])

    useEffect(() => {
      setErrMsg('')
    }, [usr, pass, cpass])

    // const addUserToFirestore = async (uid, email) => {
    //   try {
    //     // Reference the "users" collection
    //     const usersCollection = collection(db, "users");
    //     console.log('creating database')
    //     // Add a new document with the user's information
    //     await addDoc(usersCollection, {
    //       uid: uid,
    //       email: email
    //       // Add additional user data as needed
    //     });
    
    //     console.log("User added to Firestore successfully!");
    //   } catch (error) {
    //     console.error("Error adding user to Firestore: ", error);
    //   }
    // };

    // const handleSubmit = async(e) => {
    //   e.preventDefault()
    //   const v1 = USER_REGEX.test(usr)
    //   const v2 = PASS_REGEX.test(pass)
    //   if(!v1 || !v2){
    //     setErrMsg('Invalid Entry')
    //     return
    //   }
    //   // try {
    //   createUserWithEmailAndPassword(database, email, pass)
    //   .then(data => addUserToFirestore(data.user.uid, data.user.email))
    //   .catch((err)=>{
    //     setErrMsg(err.message)
    //   })
    // }

  return (
    <>
        <div className='h-[85%] flex justify-center items-center'>
        <form className='bg-black text-white h-fit w-1/4 p-5'>
          <p ref={errRef} className={errMsg ? 'text-red-500 text-center' : 'hidden'}>{errMsg}</p>
          <h1 className='text-2xl font-semibold'>Register</h1>
          <br/>
          <div>
              <label htmlFor='usrname'>Username: </label><br />
              <input id='usrname' type='text' ref={userRef} className='w-full rounded-md text-black box-border pl-1' value={usr} autoComplete='on'
              onChange={(e) => {setUsr(e.target.value)
              }}></input>
          </div>
          <br/>
          <div>
              <label htmlFor='email'>Email Id: </label><br />
              <input id='usrname' type='email' className='w-full rounded-md text-black box-border pl-1' value={email} autoComplete='on'
              onChange={(e) => {setEmail(e.target.value)}}></input>
          </div>
          <br/>
          <div>
              <label htmlFor='pwd'>Password:</label><br />
              <input id='pwd' type='password' className='w-full rounded-md text-black box-border pl-1' value={pass} autoComplete='off'
              onChange={(e) => {setPass(e.target.value)
              }}></input>
          </div>
          <br/>
          <div>
              <label htmlFor='cpwd'>Confirm Password:</label><br />
              <input id='cpwd' type='password' className='w-full rounded-md text-black box-border pl-1' value={cpass} autoComplete='off'
              onChange={(e) => {setCpass(e.target.value)
              }}></input>
          </div>
          <p id='confirmnote' className={cpassFocus &&!validCpass ? 'visible text-red-600' : 'hidden'}>
              Must match the first password.
          </p>
          <br/>
          <div>
              <button disabled={cpass==='' || !validCpass ? true: false} className={cpass==='' || !validCpass ?'bg-gray-500 w-full text-black p-1 rounded-md hover:cursor-not-allowed' : 'bg-white w-full text-black p-1 rounded-md'}>Sign Up</button>
          </div>
          <br/>
          <div>
              <p>Existing User?</p>
              <Link href={'/login'}><p className='text-blue-500'><u>Sign In</u></p></Link>
          </div>
        </form>
      </div>     
    </>
  )
}

export default page
