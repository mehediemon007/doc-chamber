import { z } from 'zod';

// schema.ts
export const signupSchema = z.object({
    fullName: z.string().trim().min(2, "Name is too short"),
    phone: z.string().trim().regex(/^01[3-9]\d{8}$/, "Invalid phone format"),
    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters")
        .regex(/[a-zA-Z]/, "Must contain a letter")
        .regex(/\d/, "Must contain a number"),
    confirmPassword: z.string().trim()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type SignupInput = z.infer<typeof signupSchema>;