import type { SessionOptions } from 'iron-session';

export interface SessionData {
  username?: string;
  email?: string;
  fullName?: string;  
  role?: string;
  isLoggedIn: boolean;
  token?: string;
  userStatus?: string;
  trainerId?: string;
  city?: string;
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

// {
//   "email": "tcdruberu@gmail.com",
//   "isLoggedIn": true,
//   "userStatus": "VERIFIED",
//   "fullName": "sethum",
//   "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MDJkOTNhOS00MzM4LTQ0ZGYtOTlkYy0yMmYwYjU5YWM1Y2IiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzQxNTc5ODQyLCJpc3MiOiJHcmVlblNwaGFyZSIsImV4cCI6MTc0MTU4MDU2Mn0.Twy-0lP9MGqAWPCPMxNvMXUvX83SproY2DL_emhCDoq7K_Jd-ecAyY7q4jwTzQ7-FEdpSy8IU7Uhhleob5JgLQ"
// }