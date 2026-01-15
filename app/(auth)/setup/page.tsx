'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react'; // For a better loading state
import { toast } from 'sonner';
import { setupChamber } from '@/app/actions/setup';
import { signIn } from "next-auth/react";

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
                callbackUrl: "/",
            });
        
            if(loginResult?.error) {
                toast.error("Login after signup failed: " + loginResult.error)
            }

            router.push('/');


        } catch (error: unknown){
            if( error instanceof Error) console.error(error.message);
            
            console.error(error)

        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="max-w-md mx-auto py-10">
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

                <hr className="my-4" />

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
    );
}