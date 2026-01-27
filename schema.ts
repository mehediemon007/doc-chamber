import { z } from 'zod';

export const signupSchema = z.object({
    fullName: z.string().trim().min(3, "Name must be at least 3 characters"),
    phone: z.string().trim().regex(/^01[3-9]\d{8}$/, "Invalid phone format (01XXXXXXXXX)"),
    password: z.string().trim().min(6, "Password must be at least 6 characters"),
})

export type SignupInput = z.infer<typeof signupSchema>;