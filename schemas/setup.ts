import { z } from 'zod';

export const setupFieldsSchema = z.object({
    fullName: z.string().trim().min(3, "Name must be at least 3 characters"),
    phone: z.string().trim().regex(/^01[3-9]\d{8}$/, "Invalid phone format"),
    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters")
        .regex(/[a-zA-Z]/, "Must contain a letter")
        .regex(/\d/, "Must contain a number"),
    chamberName: z.string().trim().min(1, 'Chamber Name is required'),
    licenseNumber: z.string().trim(),
    subscriptionToken: z.string().trim().min(1, 'Token is missing'),

});

export const setupSchema = setupFieldsSchema
    .extend({
        confirmPassword: z.string().trim().min(1, "Re-enter password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords not match",
        path: ["confirmPassword"],
    });

export type SetupInput = z.infer<typeof setupSchema>