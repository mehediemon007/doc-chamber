"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils"

export function DatePicker({ className } : {className? : string}) {

    const [date, setDate] = React.useState<Date>();
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!date}
                    className={cn("data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal", className)}
                >
                    {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setOpen(false);
                }}
                defaultMonth={date}
            />
            </PopoverContent>
        </Popover>
    )
}
