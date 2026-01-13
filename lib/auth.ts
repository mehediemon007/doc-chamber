import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: { type: "string" },
            phone: { type: "string" },
            chamberId: { type: "string" },
            licenseNumber: { type: "string" },
        }
    }
})