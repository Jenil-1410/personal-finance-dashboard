'use client';
import { auth } from '@/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Page = () => {
    const { register, handleSubmit, setFocus, setError, formState: { errors } } = useForm();
    const router = useRouter();

    useEffect(() => {
        setFocus('email');
    }, [setFocus]);

    const onSubmit = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            console.log('Auth data:', userCredential);
            router.push('/dashboard');
        } catch (err) {
            setError('formError', {
                type: 'manual',
                message: err.message
            });
        }
    };

    return (
        <div className='h-[85%] flex justify-center items-center'>
            <form className='bg-black text-white h-fit w-1/4 p-5' onSubmit={handleSubmit(onSubmit)}>
                {errors.formError && <p className='text-red-500 text-center'>{errors.formError.message}</p>}
                <h1 className='text-2xl font-semibold'>Login</h1>
                <br />
                <div>
                    <label htmlFor='email'>Email Id: </label><br />
                    <input
                        id='email'
                        type='email'
                        className='w-full rounded-md text-black box-border pl-1'
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <br />
                <div>
                    <label htmlFor='password'>Password:</label><br />
                    <input
                        id='password'
                        type='password'
                        className='w-full rounded-md text-black box-border pl-1'
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
                <br />
                <div>
                    <button className='bg-white w-full text-black p-1 rounded-md'>Login</button>
                </div>
                <br />
                <div>
                    <p>New User?</p>
                    <p className='text-blue-500 flex justify-between'>
                        <u><Link href='/register'>Register Here</Link></u>
                        <u><Link href='/forgot'>Forgot Password</Link></u>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Page;
