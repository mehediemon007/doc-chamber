'use server'

type GenerateSubsTokenResult =
  | { success: true; token: string }
  | { success: false; error: string };


export type SetupFormData = {
  phone: string;
  password: string;
  fullName: string;
  role: string;
  chamberName: string;
  licenseNumber: string;
  subscriptionToken?: string;
};

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

export async function setupChamber(formData: SetupFormData){

    try{

        const phoneWithCountryCode = process.env.DEFAULT_COUNTRY_CODE + formData.phone;

        const response = await fetch(`${process.env.CHAMBER_AUTH_BASE_URL}/setup-chamber`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, phone: phoneWithCountryCode }),
        });

        if(!response.ok){
            const errorData = await response.json();
            return{
                error: errorData || 'Chamber Setup Failed'
            }
        }
        
        return { success: true};

    } catch(error : unknown){

        if( error instanceof Error){
            throw new Error(error.message);
        }

        throw new Error(error as string);
    }
}