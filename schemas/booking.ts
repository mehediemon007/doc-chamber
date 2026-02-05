import { z } from 'zod';

export const bookingFieldSchema = z.object({
    chamberId: z.string().uuid("Invalid Chamber selection"),
    shiftId: z.string().uuid("Please select appointment time"),
    bookingDate: z.date().optional().refine((date)=> date !== undefined,{
        message: "Please select appointment date",
    }),
    fullName: z.string().trim().min(3, "Name must be at least 3 characters"),
    phone: z.string().trim().regex(/^01[3-9]\d{8}$/, "Invalid phone format"),
})

export const bookingSchema = bookingFieldSchema.omit({
    chamberId: true
});

export type BookingInput = z.infer<typeof bookingSchema>;

