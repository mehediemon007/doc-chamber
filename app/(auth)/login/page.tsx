'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';

import { signIn, SignInResponse } from 'next-auth/react';
import { toast } from 'sonner';

// *** Import Icons
import { Loader2, CircleAlert } from 'lucide-react';

type LoginFormInputs = {
    phone: string,
    password: string,
}

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, reset, formState: { errors }} = useForm<LoginFormInputs>();

    const onSubmit = async (data : LoginFormInputs) => {
        setServerError('');
        setLoading(true);

        try {

            const result  = await signIn("login", {
                identifier: data.phone.trim(),
                password: data.password,
                redirect: false,
            }) as SignInResponse;

            if (result?.error) {
                setServerError("Invalid phone number or password");
            } else {
                reset();
                toast.success('Login Successful!!');
                router.push('/dashboard');
            }

        } catch (error: unknown){

            console.error(error);
            setServerError(
                error instanceof Error ? error.message : 'Something went wrong. Please try again.'
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='flex justify-center items-center h-dvh'>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full sm:max-w-5xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-xl sm:rounded-2xl">
                        <div className='col-span-1 py-6 px-4 sm:py-8 sm:px-6 md:py-20 md:px-12'>
                            <h2 className='text-xl sm:text-2xl xl:text-4xl text-primary text-center md:text-left mb-4 sm:mb-6'>Login To Your Account!</h2>
                            {serverError && <p className='inline-flex items-center gap-1 text-sm text-red-500 mb-2'><CircleAlert size={16}/> {serverError}</p>}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="phone" className='required'>Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder='01XXX-XXXXXX' {...register('phone', {required: 'Phone Number is required'})} className={errors.phone ? 'border-red-500 focus-visible:border-red-500' : ''} onFocus={() => setServerError('')}/>
                                    {
                                        errors.phone && (
                                            <p className='text-sm text-red-500 flex items-center gap-1'>
                                                <CircleAlert size={16}/> {errors.phone.message}
                                            </p>
                                        )
                                    }
                                </div>

                                <div className="relative space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="password" className='required'>Password</Label>
                                    <PasswordInput id="password" placeholder='password1234' autoComplete='off' {...register('password', { required: 'Password is required'})} className={errors.password ? 'border-red-500 focus-visible:border-red-500' : ''} onFocus={() => setServerError('')}/>
                                    {
                                        errors.password && (
                                            <p className='text-sm text-red-500 flex items-center gap-1'>
                                                <CircleAlert size={16}/> {errors.password.message}
                                            </p>
                                        )
                                    }
                                </div>

                                <Button type="submit" className="w-full mt-1 sm:mt-2" disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {loading ? "Logging in..." : "Login"}
                                </Button>

                            </form>
                            <p className='text-center mt-4 sm:mt-6 md:mt-8'>Not Registered Yet? <Link href={'/signup'} className='font-medium text-primary'>Sign-Up</Link></p>
                        </div>
                        <div className="col-span-1 hidden md:block">
                            <Image src={'/auth-bg.png'} width={2000} height={1667} alt='Login' priority={true} fetchPriority='high'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}