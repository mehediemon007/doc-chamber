import { z } from 'zod';

export const bookingFieldSchema = z.object({
    chamberId: z.string().uuid("Invalid Chamber selection"),
    shiftId: z.string().uuid("Please select a specific shift"),
    bookingDate: z.string().min(1, "Booking date is required"),
    fullName: z.string().trim().min(3, "Name must be at least 3 characters"),
    phone: z.string().trim().regex(/^\+8801[3-9]\d{8}$/, "Invalid phone format"),
})

export const bookingSchema = bookingFieldSchema.omit({
    chamberId: true
});

export type BookingInput = z.infer<typeof bookingSchema>;

