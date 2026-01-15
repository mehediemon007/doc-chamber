'use server'

export type SetupFormData = {
  phone: string;
  password: string;
  fullName: string;
  role: string;
  chamberName: string;
  licenseNumber: string;
  subscriptionToken?: string;
};

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