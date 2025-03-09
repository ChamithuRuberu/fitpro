"use server"
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./lib/session";
import { getIronSession } from "iron-session";

const API_BASE_URL = 'http://localhost:8080/api';

export const logOut = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.destroy();
}

export const user_login = async (email: string, password: string,role_type:string) => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    
    try {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  email, password ,role_type}),
        });

        const data = await response.json();

        if (data.code === "0000") {
            session.username = data.data.user_id;
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
            session.username = data.data.user.id;
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

//register user
export const completeUserProfile = async (userData: any) => {
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
            session.username = data.data.user_id;
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

//verify otp
export const verifyOTP = async (username: string, otp: string) => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    
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
            // Store verification data in session
            session.username = data.data.user_id;
            session.userStatus = data.data.user_status;
            session.isLoggedIn = false; // Not fully logged in until profile is complete
            
            // If trainer_id exists, store it
            if (data.data.trainer_id) {
                session.trainerId = data.data.trainer_id.toString();
            }
            
            await session.save();
            return { 
                success: true, 
                data: data.data,
                isTrainer: data.data.trainer_id !== null 
            };
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


//register init 
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
            session.username = data.data.app_user_id;
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

export interface TrainerProfileData {
  username: string;
  name: string;
  city: string;
  password: string;
  role_type: string;
  servicePeriod: string;
  weight: string;
  height: string;
  profile: string;
}

export const completeTrainerProfile = async (profileData: TrainerProfileData) => {
    console.log('Starting trainer profile completion...', { profileData });
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    console.log('Current session:', session);
    
    try {
        console.log('Making API request to register trainer...');
        const response = await fetch(`${API_BASE_URL}/user/gov-user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(profileData),
        });

        const data = await response.json();

        if (data.code === "0000") {
            console.log('Registration successful, updating session...');
            // Update session with new user data
            session.username = data.data.user.username;
            session.email = data.data.user.email;
            session.fullName = data.data.user.full_name;
            session.token = data.data.token;
            session.role = 'ROLE_TRAINER';
            session.isLoggedIn = true;
            session.city = data.data.user.city;
            session.userStatus = data.data.user.status;
            
            console.log('Saving session with new data:', session);
            await session.save();
            console.log('Session saved successfully');
            
            return { 
                success: true, 
                data: data.data 
            };
        }
        
        return { success: false, error: data.message || 'Failed to complete profile' };
    } catch (error) {
        console.error('Error during trainer profile completion:', error);
        return { success: false, error: 'Failed to complete profile' };
    }
}

export const checkTrainerAuth = async () => {
    console.log('Checking trainer authentication...');
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    console.log('Current session:', session);

    if (!session.isLoggedIn || !session.token || session.role !== 'ROLE_TRAINER') {
        return { success: false, error: 'Not authenticated as trainer' };
    }

    // Check if trainer profile is complete by making an API call
    try {
        const response = await fetch(`${API_BASE_URL}/trainer/profile`, {
            headers: {
                'Authorization': `Bearer ${session.token}`,
                'Accept': 'application/json'
            }
        });

        return {
            success: true,
            profileComplete: response.status !== 404
        };
    } catch (error) {
        console.error('Error checking trainer profile:', error);
        return { success: true, profileComplete: false };
    }
}

export const logoutTrainer = async () => {
    console.log('Logging out trainer...');
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    
    try {
        if (session.token) {
            // Call logout API endpoint
            await fetch(`${API_BASE_URL}/user/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.token}`,
                    'Accept': 'application/json'
                }
            });
        }
    } catch (error) {
        console.error('Error during logout:', error);
    } finally {
        // Always destroy the session
        await session.destroy();
    }
}

export interface TrainerStats {
    monthlyRevenue: number;
    activeClients: number;
    completedSessions: number;
    upcomingSessions: number;
    averageRating: number;
}

export interface ClientData {
    id: string;
    name: string;
    program: string;
    progress: number;
    attendance: number;
    nextSession: string;
    subscriptionStatus: string;
}

export interface NutritionItem {
    id: string;
    name: string;
    category: string;
    subCategory: string;
    description: string;
    benefits: string[];
    image: string;
    tags: string[];
    nutritionalInfo: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    };
    servingSize: string;
    price: {
        amount: number;
        currency: string;
    };
}


export const getTrainerClients = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    
    if (!session.isLoggedIn || !session.token) {
        return { success: false, error: 'Not authenticated' };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/trainer/clients`, {
            headers: {
                'Authorization': `Bearer ${session.token}`,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (data.code === "0000") {
            return { 
                success: true, 
                data: data.data as ClientData[] 
            };
        }

        return { success: false, error: data.message };
    } catch (error) {
        console.error('Error fetching trainer clients:', error);
        return { success: false, error: 'Failed to fetch clients' };
    }
}

export const getRecommendedSupplements = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    
    if (!session.isLoggedIn || !session.token) {
        return { success: false, error: 'Not authenticated' };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/trainer/supplements/recommended`, {
            headers: {
                'Authorization': `Bearer ${session.token}`,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (data.code === "0000") {
            return { 
                success: true, 
                data: data.data as NutritionItem[] 
            };
        }

        return { success: false, error: data.message };
    } catch (error) {
        console.error('Error fetching recommended supplements:', error);
        return { success: false, error: 'Failed to fetch supplements' };
    }
}