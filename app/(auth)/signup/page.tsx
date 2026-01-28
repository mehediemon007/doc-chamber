'use client';

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupInput, signupSchema } from '@/schemas/signup';
import { signUpAction } from '@/app/actions/signup';
import { signIn, SignInResponse } from 'next-auth/react';

// *** Import Icons
import { Loader2 } from 'lucide-react';

export default function Signup() {

    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, setError, formState: { errors}, setValue, getValues, reset } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            password: '',
        }
    });

    const onSubmit = async (data: SignupInput) => {

        const { confirmPassword, ...submitData } = data;
        
        startTransition(async () => {

            const state = await signUpAction(null, submitData);

            if(state.success){

                toast.success(state.message);

                const result = await signIn('login', {
                    identifier: getValues('phone'),
                    password: getValues('password'),
                    redirect: false,
                }) as SignInResponse;

                reset();

                if (result?.error) {
                    toast.error('Logging Failed!!');
                    router.push('/login');
                } else {
                    router.push('/dashboard');
                }

            } else {

                if(state.fieldErrors){
                    Object.entries(state.fieldErrors).forEach(([name, message])=>{
                        setError(name as keyof SignupInput,{
                            type: 'Server',
                            message: Array.isArray(message) ? message[0] : message
                        })
                    })
                }

                if (state.error) {
                    toast.error(state.error);
                }
            }

        })
    }

    return (
        <div>
            <div className='container'>
                <div className='flex justify-center items-center h-dvh'>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full sm:max-w-5xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-xl sm:rounded-2xl">
                        <div className='col-span-1 py-6 px-4 sm:py-8 sm:px-6 md:py-20 md:px-12'>
                            <h2 className='text-xl sm:text-2xl xl:text-4xl text-primary text-center md:text-left mb-4 sm:mb-6'>Open Your Account!</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="fullName" className='required'>Full Name</Label>
                                    <Input id='fullName' {...register('fullName')} onBlur={(e) => {setValue("fullName", e.target.value.trim())}} placeholder='Hasan Masud' className={errors.fullName ? 'border-red-500 focus-visible:border-red-500' : ''}/>
                                    {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                                </div>

                                <div className="space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="phone" className='required'>Phone Number</Label>
                                    <Input id='phone' {...register('phone')} onBlur={(e) => {setValue("phone", e.target.value.trim())}} placeholder='01XXX-XXXXXX' className={errors.phone ? 'border-red-500 focus-visible:border-red-500' : ''}/>
                                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                                </div>

                                <div className="relative space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="password" className='required'>Password</Label>
                                    <PasswordInput id='password' {...register('password')} onBlur={(e) => {setValue("password", e.target.value.trim())}} placeholder='Min. 6 Character' autoComplete='off' className={errors.password ? 'border-red-500 focus-visible:border-red-500' : ''}/>
                                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                                </div>

                                <div className="relative space-y-2 mb-3 sm:mb-4">
                                    <Label htmlFor="confirmPassword" className='required'>Confirm Password</Label>
                                    <PasswordInput id='confirmPassword' {...register('confirmPassword')} placeholder='Repeat Password' autoComplete='off' className={errors.confirmPassword ? 'border-red-500 focus-visible:border-red-500' : ''}/>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
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