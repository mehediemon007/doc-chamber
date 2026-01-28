'use server'

import { setupFieldsSchema, SetupInput } from "@/schemas/setup";
import { FormActionState } from "@/types/types";

type GenerateSubsTokenResult =
  | { success: true; token: string }
  | { success: false; error: string };

export async function generateSubsToken(): Promise<GenerateSubsTokenResult>{
    
    try {

        const response = await fetch(`${process.env.CHAMBER_AUTH_BASE_URL}/generate-subscription-token`, {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json",
                "x-admin-secret": process.env.CHAMBER_ADMIN_SECRET as string
            }
        })

        if(!response.ok){

            const errorData = await response.json();

            return {
                success: false,
                error : errorData?.message || "Token Geneartion Failed"
            }
        }

        return {
            success: true,
            token: await response.text()
        }

    } catch (error: unknown) {

        if( error instanceof Error){
            throw new Error(error.message);
        }

        throw new Error(error as string);
    }
}

export async function setupChamber(prevState: FormActionState | null, formData: Omit<SetupInput, 'confirmPassword'>) : Promise<FormActionState>{

    const validatedFields = setupFieldsSchema.safeParse(formData);

    if(!validatedFields.success){
        return {
            success: false,
            message: null,
            error: "Validation failed",
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { fullName, phone, password, chamberName, licenseNumber, subscriptionToken} = validatedFields.data;
    const phoneWithCountryCode = process.env.DEFAULT_COUNTRY_CODE + phone;

    try{

        const response = await fetch(`${process.env.CHAMBER_AUTH_BASE_URL}/setup-chamber`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                fullName, 
                phone: phoneWithCountryCode,
                password,
                role: 'admin',
                chamberName,
                licenseNumber,
                subscriptionToken 
            }),
        });

        const result = await response.json();

        console.log(result);

        if(!response.ok){

            return {
                success: false,
                message: null,
                error: result.error || "Chamber Setup Failed.",
                fieldErrors: result.errorMessage || null
            };
        }
        
        return {
            success: true,
            message: result.message || "Chamber Setup Successfully!",
            error: null,
            fieldErrors: null
        }

    } catch(error : unknown){

        if( error instanceof Error){
            throw new Error(error.message);
        }

        throw new Error(error as string);
    }
}