'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// *** Import Icons
import { Loader2 } from 'lucide-react';

import { toast } from 'sonner';
import { generateSubsToken, setupChamber } from '@/app/actions/setup';
import { signIn, SignInResponse } from "next-auth/react";
import Image from 'next/image';

export default function SetupPage() {

    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        fullName: '',
        role: 'admin',
        chamberName: '',
        licenseNumber: '',
        subscriptionToken: '',
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const subsToken = async () => {

        const result = await generateSubsToken();
        
        if(!result.success){
            const errorMessage = result.error;
            toast.error(errorMessage);
            return
        }

        setFormData(prev => ({...prev, subscriptionToken: result.token}))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSetup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            
            const result = await setupChamber(formData);

            if(result.error){
                const { message: errorMessage } = result.error;
                toast.error(errorMessage);
                return
            }

            toast.success(`Chamber ${formData.chamberName} setup successful!!!`);

            const loginResult  = await signIn("login", {
                identifier: formData.phone,
                password: formData.password,
                redirect: false,
                callbackUrl: "/dashboard",
            }) as SignInResponse;
        
            if(loginResult?.error) {
                toast.error("Login after signup failed: " + loginResult.error)
            }

            router.push('/dashboard');

        } catch (error: unknown){
            if( error instanceof Error) console.error(error.message);
            
            console.error(error)

        } finally {
            setLoading(false)
        }
    };

    useEffect(()=>{
        subsToken();
    },[])

    return (
        <div className='container'>
            <div className="grid grid-cols-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-xl sm:rounded-2xl">
                <div className="col-span-1 py-6 px-4 sm:py-8 sm:px-6 md:py-20 md:px-12">
                    <h1 className="text-2xl font-bold mb-6">Setup Chamber Admin</h1>
                    <form onSubmit={handleSetup} className="space-y-4">
                        
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" required value={formData.fullName} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" required value={formData.phone} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required value={formData.password} onChange={handleChange} />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="chamberName">Chamber Name</Label>
                            <Input id="chamberName" required value={formData.chamberName} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="licenseNumber">Professional License Number</Label>
                            <Input id="licenseNumber" required value={formData.licenseNumber} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subscriptionToken">Subscription Token</Label>
                            <Input id="subscriptionToken" value={formData.subscriptionToken} onChange={handleChange} />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Creating Account..." : "Setup Chamber"}
                        </Button>
                    </form>
                </div>
                <div className="col-span-1 flex flex-col justify-center bg-[#2fd6e0]">
                    <Image src={'/chamber.jpg'} width={3000} height={2000} alt='Doc-chamber reciption'/>
                </div>
            </div>
        </div>
    );
}