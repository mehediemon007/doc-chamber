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

import { cn } from "@/lib/utils";

type DatePickerProps = {
    value?: Date,
    onChange?: (date: Date | undefined) => void,
    className?: string 
}

export function DatePicker({ value, onChange, className} : DatePickerProps) {

    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!value}
                    className={cn("data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal", className)}
                >
                    {value ? format(value, "dd-MM-yyyy") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="single"
                selected={value}
                onSelect={(date) => {
                    onChange?.(date);
                    setOpen(false);
                }}
                defaultMonth={value}
                disabled={(date) => date < new Date()}
            />
            </PopoverContent>
        </Popover>
    )
}
