export interface AuthResultUser {
  id: string;
  user: AuthUser;
  tokens: Tokens;
  validity: Validity;
}

export interface AccessTokenPayload {
  sub: string;
  phone: string;
  fullName: string;
  role: string;
  chamberId: string;
  exp: number;
}

export interface RefreshTokenPayload {
  jti: string;
  exp: number;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface Validity {
  valid_until: number;
  refresh_until: number;
}

export interface AuthUser {
  id: string;
  phone: string;
  fullName: string;
  role: string;
  chamberId: string;
}

export type SignupActionState = {
  success: boolean;
  message: string | null;
  error: string | null;
  fieldErrors?: Record<string, string[]> | null;
};