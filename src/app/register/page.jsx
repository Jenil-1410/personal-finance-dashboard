'use client';
import { auth, db } from '@/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore/lite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors }
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const router = useRouter();

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  const addUserToFirestore = async (uid, email, data) => {
    try {
      const usersCollection = doc(db, "users", uid);
      await setDoc(usersCollection, {
        uid: uid,
        email: email,
        first_name: data.firstName,
        last_name: data.lastName,
        role: "user"
      });

      console.log("User added to Firestore successfully!");
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await addUserToFirestore(userCredential.user.uid, userCredential.user.email, data);
      router.push('/dashboard');
    } catch (err) {
      setError("formError", {
        type: "manual",
        message: err.message
      });
    }
  };

  return (
    <>
      <div className='h-[85%] flex justify-center items-center'>
        <form className='bg-black text-white h-fit w-1/4 p-5' onSubmit={handleSubmit(onSubmit)}>
          {errors.formError && <p className='text-red-500 text-center'>{errors.formError.message}</p>}
          <h1 className='text-2xl font-semibold'>Register</h1>
          <br/>
          <div>
            <label htmlFor='username'>Username: </label><br />
            <input id='username' className='w-full rounded-md text-black box-border pl-1' {...register("username", { required: "Username is required" })} />
            {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
          </div>
          <br/>
          <div className='flex justify-between gap-4'>
            <div>
              <label htmlFor='firstName'>Firstname: </label><br />
              <input id='firstName' className='w-full rounded-md text-black box-border pl-1' {...register("firstName", { required: "First name is required" })} />
              {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor='lastName'>Lastname: </label><br />
              <input id='lastName' className='w-full rounded-md text-black box-border pl-1' {...register("lastName", { required: "Last name is required" })} />
              {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
            </div>
          </div>
          <br/>
          <div>
            <label htmlFor='email'>Email Id: </label><br />
            <input id='email' type='email' className='w-full rounded-md text-black box-border pl-1' {...register("email", { required: "Email is required" })} />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <br/>
          <div>
            <label htmlFor='password'>Password:</label><br />
            <input id='password' type='password' className='w-full rounded-md text-black box-border pl-1' {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters long" }
            })} />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>
          <br/>
          <div>
            <label htmlFor='confirmPassword'>Confirm Password:</label><br />
            <input id='confirmPassword' type='password' className='w-full rounded-md text-black box-border pl-1' {...register("confirmPassword", {
              validate: value => value === password.current || "Passwords do not match"
            })} />
            {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
          </div>
          <br/>
          <div>
            <button disabled={Object.keys(errors).length > 0} className={Object.keys(errors).length > 0 ? 'bg-gray-500 w-full text-black p-1 rounded-md hover:cursor-not-allowed' : 'bg-white w-full text-black p-1 rounded-md'}>Sign Up</button>
          </div>
          <br/>
          <div>
            <p>Existing User?</p>
            <Link href={'/login'}><p className='text-blue-500'><u>Sign In</u></p></Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Page;
