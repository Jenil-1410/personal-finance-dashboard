'use client';
import { auth, db } from '@/FirebaseConfig';
import { useMain } from '@/features/MainContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore/lite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string().required('Gender is required'),
  mobile: Yup.string().required('Mobile number is required'),
  birth: Yup.string().required('Birth date is required'),
  currency: Yup.string().required('Currency is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().required('Confirm password is required'),
});

const Page = () => {

  const { currData } = useMain();
  const [ error, setError ] = useState();

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors }
  } = useForm({resolver: yupResolver(validationSchema),});
  const password = useRef({});
  password.current = watch("password", "");

  const router = useRouter();

  useEffect(() => {

    setFocus('firstName');
  }, [setFocus]);

  const addUserToFirestore = async (uid, email, data) => {
    try {
      const usersCollection = doc(db, "users", uid);
      await setDoc(usersCollection, {
        uid: uid,
        email: email,
        first_name: data.firstName,
        last_name: data.lastName,
        mobile_number: data.mobile,
        date_of_birth: data.birth,
        gender: data.gender,
        currency: data.currency,
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
      const idToken = await userCredential.user.getIdToken();

      document.cookie = `userToken=${idToken}; path=/;`;
      router.push('/dashboard');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center'>
        <form className='bg-black text-white h-fit w-1/4 p-5' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-2xl font-semibold'>Register</h1>
          <br/>
          {error && <p className='text-red-500 text-center'>{error.message}</p>}
          <br/>
          <div className='flex justify-between gap-4'>
            <div>
              <label htmlFor='firstName'>Firstname: </label><br />
              <input id='firstName' className='w-full rounded-md text-black box-border pl-1' {...register("firstName")} />
              {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor='lastName'>Lastname: </label><br />
              <input id='lastName' className='w-full rounded-md text-black box-border pl-1' {...register("lastName")} />
              {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
            </div>
          </div>
          <br/>
          <div>
            <label htmlFor='email'>Email Id: </label><br />
            <input id='email' type='email' className='w-full rounded-md text-black box-border pl-1' {...register("email")} />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <br/>
          <div>
            <label htmlFor='mobile'>Mobile Number: </label><br />
            <input id='mobile' type='tel' className='w-full rounded-md text-black box-border pl-1' {...register("mobile")} />
            {errors.mobile && <p className='text-red-500'>{errors.mobile.message}</p>}
          </div>
          <br/>
          <div>
            <label htmlFor='birth'>Date Of Birth </label><br />
            <input id='birth' type='date' className='w-full rounded-md text-black box-border pl-1' {...register("birth")} />
            {errors.birth && <p className='text-red-500'>{errors.birth.message}</p>}
          </div>
          <br/>
          <div>
              <label htmlFor='gender'>Gender: </label><br />
              <select
                  id='gender'
                  className='w-full rounded-md text-black box-border pl-1'
                  defaultValue={""}
                  {...register('gender')}
              >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
              </select>
              {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
          </div>
          <br/>
          <div>
              <label htmlFor='currency'>Currency </label><br />
              <select
                  id='currency'
                  className='w-full rounded-md text-black box-border pl-1'
                  defaultValue={""}
                  {...register('currency')}
              >
                  <option value="">Select</option>
                  {
                    Object.keys(currData).length > 0 && (
                      Object.keys(currData).map((curr) => (
                        <option value={curr} key={curr}>{curr}</option>
                      ))
                    )
                  }
              </select>
              {errors.currency && <span className="text-red-500">{errors.currency.message}</span>}
          </div>
          <br/>
          <div>
            <label htmlFor='password'>Password:</label><br />
            <input id='password' type='password' className='w-full rounded-md text-black box-border pl-1' {...register("password", {
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
