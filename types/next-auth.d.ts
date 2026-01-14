import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone: string;
      fullName: string;
      role: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    validity: {
      valid_until: number;
      refresh_until: number;
    };
  }

  interface User {
    id: string;
    phone: string;
    fullName: string;
    role: string;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    validity: {
      valid_until: number;
      refresh_until: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      phone: string;
      fullName: string;
      role: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    validity: {
      valid_until: number;
      refresh_until: number;
    };
  }
}
