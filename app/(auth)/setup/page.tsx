'use client';

import React, { useEffect, useCallback, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/PasswordInput';


import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetupInput, setupSchema } from '@/schemas/setup';
import { generateSubsToken, setupChamber } from '@/app/actions/setup';
import { signIn, SignInResponse } from "next-auth/react";

import { toast } from 'sonner';

// *** Import Icons
import { Loader2, RefreshCw } from 'lucide-react';

export default function SetupPage() {

    const router = useRouter();
    
    const [isTokenPending, startTokenTransition] = useTransition();
    const [isPending, startTransition] = useTransition();

    const form = useForm<SetupInput>({
        resolver: zodResolver(setupSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            password: "",
            confirmPassword: "",
            chamberName: "",
            licenseNumber: "",
            subscriptionToken: "",
        }
    })

    const subsToken = useCallback(async (force = false) => {

        if(!force && form.getValues('subscriptionToken')) return

        startTokenTransition(async ()=> {
            const result = await generateSubsToken();
        
            if(!result.success){
                
                console.error(result.error);

                form.setError('subscriptionToken', {
                    type: 'Manual',
                    message: 'Failed to generate token! Refresh.'
                })

                form.setValue('subscriptionToken', '')
                return
            }

            form.clearErrors('subscriptionToken');
            form.setValue('subscriptionToken', result.token);
        })

    },[form])

    const onSubmit = async (data: SetupInput) => {

        const { confirmPassword, ...submitData } = data;

        startTransition( async () => {

            const state = await setupChamber(null, submitData);

            if(state.success){

                toast.success(state.message);

                const result = await signIn('login', {
                    identifier: form.getValues('phone'),
                    password: form.getValues('password'),
                    redirect: false,
                }) as SignInResponse;
                
                form.reset();
                
                if (result?.error) {
                    toast.error('Logging Failed!!');
                    router.push('/login');
                } else {
                    router.push('/dashboard');
                }
            } else {
            
                if(state.fieldErrors){
                    Object.entries(state.fieldErrors).forEach(([name, message])=>{
                        form.setError(name as keyof SetupInput,{
                            type: 'Server',
                            message: Array.isArray(message) ? message[0] : message
                        })
                    })
                }
            
                if (state.error) {
                    toast.error(state.message);
                }
            }
        })
    };

    useEffect(()=>{
        subsToken();
    },[subsToken])

    return (
        <div className='container'>
            <div className="flex justify-center items-center min-h-dvh sm:py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full sm:max-w-5xl sm:shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-xl sm:rounded-2xl">
                    <div className="col-span-1 order-1 md:order-0 py-4 px-1 sm:p-6 md:py-8">
                        <h2 className='text-xl sm:text-2xl xl:text-4xl text-primary text-center md:text-left mb-4'>Setup Chamber!</h2>
                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <FieldGroup className='grid grid-cols-1 sm:grid-cols-2'>
                                <Controller
                                    name='fullName'
                                    control={form.control}
                                    render={({ field, fieldState })=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='fullName' className='required'>Full Name</FieldLabel>
                                            <Input
                                                {...field}
                                                id='fullName'
                                                aria-invalid={fieldState.invalid}
                                                placeholder='Ben Stock'
                                                onBlur={(e)=>{
                                                    field.onChange(e.target.value.trim())
                                                }}
                                            />
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]}/>
                                                )
                                            }
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name='phone'
                                    control={form.control}
                                    render={({ field, fieldState })=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='phone' className='required'>Phone Number</FieldLabel>
                                            <Input
                                                {...field}
                                                id='phone'
                                                aria-invalid={fieldState.invalid}
                                                placeholder='01XXX-XXXXXX'
                                                onBlur={(e)=>{
                                                    field.onChange(e.target.value.trim())
                                                }}
                                            />
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]}/>
                                                )
                                            }
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name='password'
                                    control={form.control}
                                    render={({ field, fieldState })=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='password' className='required'>Password</FieldLabel>
                                            <PasswordInput
                                                {...field}
                                                id='password'
                                                aria-invalid={fieldState.invalid}
                                                placeholder='Min. 6 Character' 
                                                autoComplete='off'
                                                onBlur={(e)=>{
                                                    field.onChange(e.target.value.trim())
                                                }}
                                            />
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]}/>
                                                )
                                            }
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name='confirmPassword'
                                    control={form.control}
                                    render={({ field, fieldState })=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='confirmPassword' className='required'>Confirm Password</FieldLabel>
                                            <PasswordInput
                                                {...field}
                                                id='confirmPassword'
                                                aria-invalid={fieldState.invalid}
                                                placeholder='Repeat Password' 
                                                autoComplete='off'
                                            />
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]}/>
                                                )
                                            }
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name='chamberName'
                                    control={form.control}
                                    render={({ field, fieldState })=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='chamberName' className='required'>Chamber Name</FieldLabel>
                                            <Input
                                                {...field}
                                                id='chamberName'
                                                aria-invalid={fieldState.invalid}
                                                placeholder='Pulse Care'
                                                onBlur={(e)=>{
                                                    field.onChange(e.target.value.trim())
                                                }}
                                            />
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]}/>
                                                )
                                            }
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name='licenseNumber'
                                    control={form.control}
                                    render={({ field, fieldState })=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='licenseNumber'>Professional License Number</FieldLabel>
                                            <Input
                                                {...field}
                                                id='licenseNumber'
                                                aria-invalid={fieldState.invalid}
                                                placeholder='e.g. 109500'
                                                onBlur={(e)=>{
                                                    field.onChange(e.target.value.trim())
                                                }}
                                            />
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]}/>
                                                )
                                            }
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name='subscriptionToken'
                                    control={form.control}
                                    render={({ field, fieldState })=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='subscriptionToken' className='required'>Subscription Token</FieldLabel>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    id='subscriptionToken'
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder='BETA-6XZXXXX'
                                                />
                                                <div className='absolute right-3 top-1/2 inline-flex items-center -translate-y-1/2'>
                                                    {
                                                        isTokenPending ? (
                                                            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                                        ) : fieldState.invalid ? (
                                                                <button type='button' aria-label='Generate Token' onClick={()=>subsToken(true)} className='text-gray-400 transition-all duration-75 ease-in-out hover:text-foreground'>
                                                                    <RefreshCw className="h-4 w-4"/>
                                                                </button>
                                                        ) : null
                                                    }
                                                </div>
                                            </div>
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]}/>
                                                )
                                            }
                                        </Field>
                                    )}
                                />
                                
                                <Field className='col-span-1 sm:col-span-2'>
                                    <Button type="submit" className="w-full mt-1 sm:mt-2" disabled={isPending}>
                                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isPending ? "Creating Account..." : "Setup Chamber"}
                                    </Button>
                                </Field>

                            </FieldGroup>
                        </form>
                    </div>
                    <div className="col-span-1 h-full order-0 md:order-1">
                        <Image src={'/chamber.jpg'} width={3000} height={2000} alt='Doc-chamber reciption' priority={true} fetchPriority='high' className='md:h-full mt-2 sm:mt-0 md:rounded-r-2xl'/>
                    </div>
                </div>
            </div>
        </div>
    );
}