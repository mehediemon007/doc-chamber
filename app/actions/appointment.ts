import { BookingInput, bookingSchema } from "@/schemas/booking";
import { FormActionState } from "@/types/types";

export async function makeAppointment(formData: BookingInput) : Promise<FormActionState>{

    const validatedFields = bookingSchema.safeParse(formData);

    if(!validatedFields.success){
        return {
            success: false,
            message: null,
            error: "Validation failed",
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { fullName, phone, bookingDate, shiftId} = validatedFields.data;
    const phoneWithCountryCode = process.env.DEFAULT_COUNTRY_CODE + phone;
    const chamberId = process.env.CHAMBER_ID;

    try {

        const response = await fetch(`${process.env.API_BASE_URL}/bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                fullName, 
                phone: phoneWithCountryCode,
                chamberId,
                bookingDate,
                shiftId 
            }),
        });

        const result = await response.json();

        if(!response.ok){

            return {
                success: false,
                message: result.message,
                error: result.error || "Chamber Setup Failed.",
                fieldErrors: result?.errorMessage || null
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
