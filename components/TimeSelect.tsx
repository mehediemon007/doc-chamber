import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';

function TimeSelect() {
    return (
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
    )
}

export default TimeSelect;