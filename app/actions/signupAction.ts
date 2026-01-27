'use server';

import { signupSchema, SignupInput } from "@/schema";
import { SignupActionState } from "@/types/auth-types";

export async function signUpAction(prevState: SignupActionState | null, formData: Omit<SignupInput, "confirmPassword">) : Promise<SignupActionState>{

    const validatedFields = signupSchema.safeParse(formData);

    if(!validatedFields.success){
        return {
            success: false,
            message: null,
            error: "Validation failed",
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        }
    }
    
    const { fullName, phone, password } = validatedFields.data;
    const phoneWithCountryCode = process.env.DEFAULT_COUNTRY_CODE + phone;

    try {

        const response = await fetch(`${process.env.CHAMBER_AUTH_BASE_URL}/signup`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName,
                phone: phoneWithCountryCode,
                role: 'patient',
                password
            })
        })

        const result = await response.json();

        if(!response.ok){

            return {
                success: false,
                message: null,
                error: result.error || "Failed to create account.",
                fieldErrors: result.errorMessage || null
            };

        }

        return {
            success: true,
            message: result.message || "Account created successfully!",
            error: null,
            fieldErrors: null
        }

    } catch (error: unknown) {

        if( error instanceof Error){
            throw new Error(error.message);
        }

        throw new Error(error as string);
    }
}