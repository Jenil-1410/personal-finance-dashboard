'use client';
import { auth } from '@/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useFirebase } from '@/features/FirebaseContext';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Page = () => {
    const { usrData } = useFirebase();
    const { register, handleSubmit, setError, formState: { errors } } = useForm({resolver: yupResolver(validationSchema),});
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const idToken = await userCredential.user.getIdToken();
            document.cookie = `userToken=${idToken}; path=/;`;
            router.push(`/dashboard/${usrData?.first_name}`);
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
                        name='email'
                        className='w-full rounded-md text-black box-border pl-1'
                        {...register('email', { required: true })}
                        autoComplete='on'
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <br />
                <div>
                    <label htmlFor='password'>Password:</label><br />
                    <input
                        id='password'
                        type='password'
                        name='password'
                        className='w-full rounded-md text-black box-border pl-1'
                        {...register('password', { required: true })}
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
