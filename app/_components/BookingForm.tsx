'use client';

import React, { useTransition } from 'react';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/DatePicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookingInput, bookingSchema } from '@/schemas/booking';
import { makeAppointment } from '@/app/actions/appointment';

import { toast } from 'sonner';

// *** Import Icons
import { Loader2 } from 'lucide-react';

function BookingForm() {

    const [isPending, startTransition] = useTransition();

    const form = useForm<BookingInput>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            bookingDate: undefined,
            shiftId: ''
        }
    })

    const onSubmit = async (data: BookingInput) => {

        startTransition(async () => {

            const state = await makeAppointment(data);

            if(state.success){
                toast.success(state.message);
            }

        })
    }

    
    return (
        <div className='space-y-5'>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className='grid grid-cols-2 gap-5'>
                    <Controller
                        name='fullName'
                        control={form.control}
                        render={({ field, fieldState})=>(
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
                                    className='h-12 bg-[#f6f6f6] border-[#EEEEEE] rounded-[50px] py-2.5 px-4 placeholder:text-muted-foreground'
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
                        render={({ field, fieldState})=>(
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
                                    className='h-12 bg-[#f6f6f6] border-[#EEEEEE] rounded-[50px] py-2.5 px-4 placeholder:text-muted-foreground'
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
                        name='bookingDate'
                        control={form.control}
                        render={({ field, fieldState}) => (
                            <Field>
                                <FieldLabel htmlFor="bookingDate" className='required'>Appointment Date</FieldLabel>
                                <DatePicker 
                                    value={field.value}
                                    onChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                    className='w-full h-12 bg-[#f6f6f6] border-[#EEEEEE] rounded-[50px] shadow-none py-2.5 px-4! hover:bg-[#f6f6f6]'
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name='shiftId'
                        control={form.control}
                        render={({field, fieldState})=>(
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-select-shift" className='required'>Appointment Time</FieldLabel>
                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id='form-rhf-select-shift' 
                                        aria-invalid={fieldState.invalid}
                                        className="w-full h-12! bg-[#f6f6f6] border-[#EEEEEE] rounded-[50px] shadow-none py-2.5 px-4!">
                                            <SelectValue placeholder="Select time"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <ScrollArea className="h-60">
                                            {Array.from({ length: 96 }).map((_, i) => {
                                                const totalMinutes = i * 15;
                                                const hour = Math.floor(totalMinutes / 60);
                                                const minute = totalMinutes % 60;
                                                
                                                const displayHour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
                                                const period = hour < 12 ? 'AM' : 'PM';
                                                
                                                const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                                                const displayTime = `${displayHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
                                                
                                                return (
                                                    <SelectItem key={i} value={timeString}>
                                                        {displayTime}
                                                    </SelectItem>
                                                );
                                            })}
                                        </ScrollArea>
                                    </SelectContent>
                                </Select>
                                {
                                    fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )
                                }
                            </Field>
                        )}
                    />
                </FieldGroup>
                <Field>
                    <Button type="submit" className='h-12 text-base font-manrope font-semibold rounded-[50px] mt-4' disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isPending ? "Booking Appointment..." : "Book appointment"}
                    </Button>
                </Field>
            </form>
        </div>
    )
}

export default BookingForm;