'use server';

export type User = {
    id: string;
    phone: string;
    fullName: string;
    role: string;
};

export type ActionState = {
    success: boolean;
    message: string | null;
    error: string | null;
    fieldErrors?: {
        phone?: string;
        password?: string;
        fullName?: string;
    } | null;
    user?: User | null;
};

export async function signUpAction(prevState: ActionState, formData: FormData) : Promise<ActionState> {
    
    const fullName = formData.get("fullName");
    const phone = formData.get("phone");
    const role = 'patient';
    const password = formData.get("password");

    try {

        const phoneWithCountryCode = process.env.DEFAULT_COUNTRY_CODE + phone;

        const response = await fetch(`${process.env.CHAMBER_AUTH_BASE_URL}/signup`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName,
                phone: phoneWithCountryCode,
                role,
                password
            })
        })

        const result = await response.json();

        if(!response.ok){

            return {
                success: false,
                message: null,
                error: result?.error || "Failed to create account.",
                fieldErrors: result.errorMessage || null
            };
        }

        return {
            success: true,
            message: result.message || "Account created successfully!",
            user: result.user,
            error: null,
            fieldErrors: null
        };

    } catch (error: unknown) {

        if( error instanceof Error){
            throw new Error(error.message);
        }

        throw new Error(error as string);
    }
}