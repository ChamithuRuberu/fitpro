import { API_ENDPOINTS } from '@/constants/dashboard';
import type { ScheduleDay, Supplement, WorkoutProgram } from '@/types/dashboard';

export class DashboardService {
  private static instance: DashboardService;
  private token: string | null = null;

  private constructor() {}

  static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService();
    }
    return DashboardService.instance;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async fetchWithAuth(endpoint: string) {
    if (!this.token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  }

  async getSchedule(): Promise<ScheduleDay[]> {
    const response = await this.fetchWithAuth(API_ENDPOINTS.SCHEDULE);
    return response.data;
  }

  async getSupplements(): Promise<Supplement[]> {
    const response = await this.fetchWithAuth(API_ENDPOINTS.SUPPLEMENTS);
    return response.data;
  }

  async getWorkoutProgram(): Promise<WorkoutProgram> {
    const response = await this.fetchWithAuth(API_ENDPOINTS.WORKOUT_PROGRAM);
    return response.data;
  }

  async getTrainerProfile(): Promise<any> {
    const response = await this.fetchWithAuth(API_ENDPOINTS.TRAINER_PROFILE);
    return response.data;
  }
} 