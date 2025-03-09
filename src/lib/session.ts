import type { SessionOptions } from 'iron-session';

export interface SessionData {
  userId?: string;
  email?: string;
  fullName?: string;
  role?: string;
  isLoggedIn: boolean;
  token?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD || 'complex_password_at_least_32_characters_long',
  cookieName: 'fitpro_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
}; 