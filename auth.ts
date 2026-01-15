import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import type {
    AccessTokenPayload,
    RefreshTokenPayload,
    Tokens,
    AuthUser,
} from "@/types/auth-types";


const refreshAccessToken = async (refreshToken: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CHAMBER_AUTH_BASE_URL}/refresh-token`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            }
        );

        if (!response.ok) return null;

        const tokens: Tokens = await response.json();

        const access = jwtDecode<AccessTokenPayload>(tokens.accessToken);
        const refresh = jwtDecode<RefreshTokenPayload>(tokens.refreshToken);

        return {
            user: getUserFromAccessToken(access),
            tokens,
            validity: {
                valid_until: access.exp,
                refresh_until: refresh.exp,
            },
        };
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return null;
    }
};


const getUserFromAccessToken = (accessToken: AccessTokenPayload): AuthUser => {
    return {
        id: accessToken.sub,
        phone: accessToken.phone,
        fullName: accessToken.fullName,
        role: accessToken.role,
        chamberId: accessToken.chamberId,
    };
};


export const nextOptions = {
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },

    providers: [
        CredentialsProvider({
            id: "login",
            name: "Credentials",
            credentials: {
                identifier: { label: "Phone Number", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {

                let identifier = credentials?.identifier as string;
                const password = credentials?.password as string;

                if (!identifier || !password) {
                    throw new Error("Missing credentials");
                }

                identifier = identifier.includes('@') ? identifier : process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE + identifier;

                const apiResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_CHAMBER_AUTH_BASE_URL}/login`,
                    {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        identifier,
                        password,
                    }),
                    }
                );

                if (!apiResponse.ok) {
                    const errorText = await apiResponse.text();
                    console.error("Backend Login Failed Status:", apiResponse.status);
                    console.error("Backend Login Error Body:", errorText);
                    return null;
                }
                
                const tokens: Tokens = await apiResponse.json();

                const access = jwtDecode<AccessTokenPayload>(tokens.accessToken);
                const refresh = jwtDecode<RefreshTokenPayload>(tokens.refreshToken);
                
                const user = getUserFromAccessToken(access);

                const validity = {
                    valid_until : access.exp,
                    refresh_until : refresh.exp
                }

                return {
                    id: user.id,
                    phone: user.phone,
                    fullName: user.fullName,
                    role: user.role,
                    tokens,
                    validity,
                };

            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    phone: user.phone,
                    fullName: user.fullName,
                    role: user.role,
                };
                token.tokens = user.tokens;
                token.validity = user.validity;
            }

            if (token.validity && Date.now() > token.validity.valid_until * 1000) {
                const refreshed = await refreshAccessToken(
                    token.tokens.refreshToken
                );

                if (refreshed) {
                    token.user = refreshed.user;
                    token.tokens = refreshed.tokens;
                    token.validity = refreshed.validity;
                }
            }

            return token;
        },

        async session({ session, token }) {
            session.user = { ...session.user, ...token.user };
            session.tokens = token.tokens;
            session.validity = token.validity;
            return session;
        },
    },
} satisfies Parameters<typeof NextAuth>[0];

export const { handlers, auth, signOut } = NextAuth(nextOptions);