import React from 'react';
import { DatePicker } from '@/components/DatePicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';

import { useForm } from 'react-hook-form';
import { BookingInput, bookingSchema } from '@/schemas/booking';
import { zodResolver } from '@hookform/resolvers/zod';

function BookingForm() {

    const form = useForm<BookingInput>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            bookingDate: '',
            shiftId: ''
        }
    })
    
    return (
        <div className='space-y-5'>
            <form>
                <fieldset className='grid grid-cols-2 gap-5'>
                    <div className='col-span-1'>
                        <label htmlFor="name" className='required'>Name</label>
                        <input id="name" type="text" placeholder='Hasan Masud' autoComplete='off' className='h-12'/>
                    </div>
                    <div className='col-span-1'>
                        <label htmlFor="phone" className='required'>Phone</label>
                        <input id="phone" type="tel" placeholder='01XXX-XXXXXX' autoComplete='off' className='h-12'/>
                    </div>
                    <div className='col-span-1'>
                        <label htmlFor="date" className='required'>Date</label>
                        <DatePicker className='w-full h-12 bg-[#f6f6f6] border-[#EEEEEE] rounded-[50px] shadow-none py-2.5 px-4! hover:bg-[#f6f6f6]'/>
                    </div>
                    <div className='col-span-1'>
                        <label htmlFor="time" className='required'>Time</label>
                        <Select
                            // defaultValue={time!}
                            // onValueChange={(e) => {
                            //     setTime(e);
                            //     if (date) {
                            //     const [hours, minutes] = e.split(":");
                            //     const newDate = new Date(date.getTime());
                            //     newDate.setHours(parseInt(hours), parseInt(minutes));
                            //     setDate(newDate);
                            //     field.onChange(newDate);
                            //     }
                            // }}
                        >
                            <SelectTrigger className="w-full h-12! bg-[#f6f6f6] border-[#EEEEEE] rounded-[50px] shadow-none py-2.5 px-4!">
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
                    </div>
                </fieldset>
                <button className='btn btn-default btn-primary w-full mt-6'>
                    Book appointment
                </button>
            </form>
        </div>
    )
}

export default BookingForm;