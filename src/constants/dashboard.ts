export const DASHBOARD_TABS = {
  OVERVIEW: 'overview',
  SCHEDULE: 'schedule',
  SUPPLEMENTS: 'supplements',
  WORKOUTS: 'workouts',
  PROGRESS: 'progress'
} as const;

export type DashboardTabType = typeof DASHBOARD_TABS[keyof typeof DASHBOARD_TABS];

export const API_ENDPOINTS = {
  SCHEDULE: '/api/client/schedule',
  SUPPLEMENTS: '/api/client/supplements',
  WORKOUT_PROGRAM: '/api/client/workout-program',
  TRAINER_PROFILE: '/api/trainer/profile'
} as const; 