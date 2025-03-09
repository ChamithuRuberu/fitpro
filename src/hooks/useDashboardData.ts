import { useState, useEffect } from 'react';
import { DashboardService } from '@/services/dashboard.service';
import type { ScheduleDay, Supplement, WorkoutProgram } from '@/types/dashboard';
import { AuthService } from '@/services/auth.service';

export const useDashboardData = () => {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [workoutProgram, setWorkoutProgram] = useState<WorkoutProgram | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authService = new AuthService();
        const auth = authService.getAuthData();
        
        if (!auth.token) {
          throw new Error('No authentication token');
        }

        const dashboardService = DashboardService.getInstance();
        dashboardService.setToken(auth.token);

        const [scheduleData, supplementsData, workoutData] = await Promise.all([
          dashboardService.getSchedule(),
          dashboardService.getSupplements(),
          dashboardService.getWorkoutProgram()
        ]);

        setSchedule(scheduleData);
        setSupplements(supplementsData);
        setWorkoutProgram(workoutData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    schedule,
    supplements,
    workoutProgram,
    isLoading,
    error
  };
}; 