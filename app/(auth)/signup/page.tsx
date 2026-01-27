'use client';

import React, {useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { ActionState, signUpAction } from '@/app/actions/authActions';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

// *** Import Icons
import { Loader2 } from 'lucide-react';


const initialState: ActionState = {
    success: false,
    message: null,
    error: null
}

export default function Signup() {

    const [state, formAction, isPending] = useActionState(signUpAction, initialState);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    useEffect(()=>{

        if(state.success){
            toast.success(state.message);

            console.log(formData)

            signIn('login', {
                identifier: formData.phone,
                password: formData.password,
                callbackUrl: '/',
            });
        }

        if (state.error) {
            toast.error(state.error);
        }

    },[state, formData])

    return (
        <div>
            <div className='container'>
                <div className='flex justify-center items-center h-dvh'>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full sm:max-w-5xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-xl sm:rounded-2xl">
                        <div className='col-span-1 py-6 px-4 sm:py-8 sm:px-6 md:py-20 md:px-12'>
                            <h2 className='text-xl sm:text-2xl xl:text-4xl text-primary text-center md:text-left mb-4 sm:mb-6'>Open Your Account!</h2>
                            <form action={formAction}>

                                <div className="space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="fullName" className='required'>Full Name</Label>
                                    <Input id="fullName" name='fullName' type="text" placeholder='Hasan Masud' value={formData.fullName} required onChange={handleChange}/>
                                    {state.fieldErrors?.fullName && <p className="text-red-500 text-sm">{state.fieldErrors?.fullName}</p>}
                                </div>

                                <div className="space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="phone" className='required'>Phone Number</Label>
                                    <Input id="phone" name='phone' type="tel" placeholder='01XXX-XXXXXX' value={formData.phone} required onChange={handleChange}/>
                                    {state.fieldErrors?.phone && <p className="text-red-500 text-sm">{state.fieldErrors?.phone}</p>}
                                </div>

                                <div className="relative space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="password" className='required'>Password</Label>
                                    <Input id="password" name='password' type="password" value={formData.password} required  autoComplete='off' onChange={handleChange}/>
                                    {state.fieldErrors?.password && <p className="text-red-500 text-sm">{state.fieldErrors?.password}</p>}
                                </div>

                                <Button type="submit" className="w-full mt-1 sm:mt-2" disabled={isPending}>
                                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isPending ? "Creating Account..." : "Sign-Up"}
                                </Button>

                            </form>
                            <p className='text-center mt-4 sm:mt-6 md:mt-8'>Already Has Account? <Link href={'/login'} className='font-medium text-primary'>Login</Link></p>
                        </div>
                        <div className="col-span-1 hidden md:block">
                            <Image src={'/auth-bg.png'} width={2000} height={1667} alt='Signup' priority={true} fetchPriority='high'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}