"use server"
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./lib/session";
import { getIronSession } from "iron-session";

const API_BASE_URL = 'http://localhost:8080/api';

export const logOut = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.destroy();
}

export const user_login = async (email: string, password: string) => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }),
        });

        const data = await response.json();

        if (data.code === "0000") {
            session.userId = data.data.user_id;
            session.email = email;
            session.token = data.data.token;
            session.isLoggedIn = true;
            session.role = data.data.role;
            await session.save();
            return { success: true, data: data.data };
        }
        
        return { success: false, error: data.message };
    } catch (error) {
        return { success: false, error: 'Login failed' };
    }
}

export const trainer_login = async (email: string, password: string) => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    
    try {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                role_type: 'ROLE_TRAINER'
            }),
        });

        const data = await response.json();

        if (data.code === "0000") {
            // Store trainer session data
            session.userId = data.data.user.id;
            session.email = email;
            session.fullName = data.data.user.full_name;
            session.token = data.data.token;
            session.isLoggedIn = true;
            session.role = 'ROLE_TRAINER';
            await session.save();

            // Check trainer profile completion
            const profileResponse = await fetch(`${API_BASE_URL}/trainer/profile`, {
                headers: {
                    'Authorization': `Bearer ${data.data.token}`,
                    'Accept': 'application/json'
                }
            });

            return { 
                success: true, 
                data: data.data,
                profileComplete: profileResponse.status !== 404
            };
        }
        
        return { success: false, error: data.message };
    } catch (error) {
        return { success: false, error: 'Login failed' };
    }
}

export const registerUser = async (userData: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/app-user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (data.code === "0000") {
            const session = await getIronSession<SessionData>(cookies(), sessionOptions);
            session.userId = data.data.user_id;
            session.email = userData.username;
            session.fullName = userData.full_name;
            session.role = 'ROLE_USER';
            session.isLoggedIn = true;
            session.token = data.data.token;
            await session.save();
            return { success: true, data: data.data };
        }

        return { success: false, error: data.message };
    } catch (error) {
        return { success: false, error: 'Registration failed' };
    }
}

export const verifyOTP = async (username: string, otp: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/register-verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, otp }),
        });

        const data = await response.json();

        if (data.code === "0000") {
            const session = await getIronSession<SessionData>(cookies(), sessionOptions);
            session.userId = data.data.user_id;
            session.isLoggedIn = false; // Not fully logged in until profile is complete
            await session.save();
            return { success: true, data: data.data };
        }

        return { success: false, error: data.message };
    } catch (error) {
        return { success: false, error: 'Verification failed' };
    }
}

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    return session;
}

export const initializeRegistration = async (userData: {
  nic: string;
  mobile: string;
  email: string;
  role_type: string;
  trainer_id?: number;
}) => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    
    try {
        const response = await fetch(`${API_BASE_URL}/user/register-init`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (data.code === "0000") {
            // Store initial registration data in session
            session.userId = data.data.app_user_id;
            session.email = userData.email;
            session.role = userData.role_type;
            session.isLoggedIn = false;
            if (userData.trainer_id) {
                session.trainerId = userData.trainer_id.toString();
            }
            await session.save();
            
            return { success: true, data: data.data };
        }

        return { success: false, error: data.message };
    } catch (error) {
        return { success: false, error: 'Registration initialization failed' };
    }
}