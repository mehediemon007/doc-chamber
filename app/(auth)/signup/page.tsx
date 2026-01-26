'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// *** Import Icons
import { Loader2 } from 'lucide-react';

export default function Signup() {

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, [e.target.id] : e.target.value}))
    }
    
    const handleSignup = async (e : React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
    }

    return (
        <div>
            <div className='container'>
                <div className='flex justify-center items-center h-dvh'>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full sm:max-w-5xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-xl sm:rounded-2xl">
                        <div className='col-span-1 py-6 px-4 sm:py-8 sm:px-6 md:py-20 md:px-12'>
                            <h2 className='text-xl sm:text-2xl xl:text-4xl text-primary text-center md:text-left mb-4 sm:mb-6'>Open Your Account!</h2>
                            <form onSubmit={handleSignup}>

                                <div className="space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="fullName" className='required'>Full Name</Label>
                                    <Input id="fullName" type="tel" required value={formData.phone} placeholder='Hasan Masud' onChange={handleChange} />
                                </div>

                                <div className="space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="phone" className='required'>Phone Number</Label>
                                    <Input id="phone" type="tel" required value={formData.phone} placeholder='01XXX-XXXXXX' onChange={handleChange} />
                                </div>

                                <div className="relative space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="password" className='required'>Password</Label>
                                    <Input id="password" type="password" required value={formData.password} placeholder='password1234' autoComplete='off' onChange={handleChange} />
                                </div>

                                <Button type="submit" className="w-full mt-1 sm:mt-2" disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {loading ? "Creating Account..." : "Sign-Up"}
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