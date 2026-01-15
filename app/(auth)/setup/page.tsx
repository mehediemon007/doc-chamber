'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react'; // For a better loading state
import { signIn } from 'next-auth/react';

export default function SetupPage() {
    // Senior tip: Use a single object for form state to reduce re-renders
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_CHAMBER_AUTH_BASE_URL}/setup-chamber`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, phone: process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE + formData.phone }),
        });

        if (response.ok) {

            const result = await signIn("login", {
                identifier: formData.phone,
                password: formData.password,
                redirect: false,
                callbackUrl: "/",
            });

            if(result?.error) {
                alert("Login after signup failed: " + result.error);
                setLoading(false);
                return;
            } else {
                router.push("/");
            }


        } else {
            alert("Signup failed. Check your token or credentials.");
            setLoading(false);
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