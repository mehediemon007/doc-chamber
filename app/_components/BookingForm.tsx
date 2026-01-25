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

function BookingForm() {
    return (
        <div className='bg-white rounded-4xl p-7.5 space-y-2.5'>
            <h4 className='font-medium'>Request a call</h4>
            <p className='mb-5'>Please fill your information so we can get in touch with you.</p>
            <form>
                <fieldset className='space-y-2.5'>
                    <div>
                        <label htmlFor="name" className='required'>Name</label>
                        <input id="name" type="text" placeholder='Hasan Masud' autoComplete='off'/>
                    </div>
                    <div>
                        <label htmlFor="phone" className='required'>Phone</label>
                        <input id="phone" type="tel" placeholder='01XXX-XXXXXX' autoComplete='off'/>
                    </div>
                    <div>
                        <label htmlFor="date" className='required'>Date</label>
                        <DatePicker className='w-full h-auto bg-[#f6f6f6] border-[#EEEEEE] rounded-[50px] shadow-none py-2.5 px-4! hover:bg-[#f6f6f6]'/>
                    </div>
                    <div>
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
                            <SelectTrigger className="w-full h-auto! bg-[#f6f6f6] border-[#EEEEEE] rounded-[50px] shadow-none py-2.5 px-4! focus:ring-0 focus:ring-offset-0 focus-visible:outline-1 focus-visible:outline-primary">
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
                <button className='btn-default w-full mt-4'>
                    <span>Request a call</span>
                </button>
            </form>
        </div>
    )
}

export default BookingForm;