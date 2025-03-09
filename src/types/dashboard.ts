export type UserRole = 'super_admin' | 'gym_admin' | 'trainer' | 'client';

export type GymData = {
  id: string;
  name: string;
  location: string;
  memberCount: number;
  trainerCount: number;
  rating: number;
  revenue: number;
};

export type TrainerData = {
  id: string;
  name: string;
  gym: string;
  clientCount: number;
  rating: number;
  specializations: string[];
  activePrograms: number;
  revenue: number;
};

export type ClientData = {
  id: string;
  name: string;
  program: string;
  trainer: string;
  progress: number;
  attendance: number;
  nextSession: string;
  subscriptionStatus: 'active' | 'expired' | 'pending';
};

export type DashboardStats = {
  totalRevenue: number;
  activeMembers: number;
  totalTrainers: number;
  totalGyms: number;
  activePrograms: number;
  averageRating: number;
};

export interface UserData {
  email: string;
  city: string;
  status: string;
  mobile: string;
  full_name: string;
  gov_id: string | null;
}

export interface Workout {
  time: string;
  type: string;
  duration: string;
}

export interface ScheduleDay {
  id: number;
  day: string;
  workouts: Workout[];
}

export interface Supplement {
  id: number;
  name: string;
  timing: string;
  dosage: string;
  benefits: string[];
  recommended: boolean;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: string;
}

export interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

export interface WorkoutWeek {
  weekNumber: number;
  workouts: WorkoutDay[];
}

export interface WorkoutProgram {
  name: string;
  weeks: WorkoutWeek[];
} 