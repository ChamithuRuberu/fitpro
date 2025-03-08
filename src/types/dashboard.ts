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