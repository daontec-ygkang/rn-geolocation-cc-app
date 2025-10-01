/**
 * AppState Types
 * Global application state type definitions
 */

export type ActivityType = 'inactive' | 'walking' | 'running';

export interface PermissionsState {
  location: boolean;
  activity: boolean;
  notifications: boolean;
}

export interface SettingsState {
  darkMode: boolean;
  sensitivity: 'low' | 'medium' | 'high';
  notificationsEnabled: boolean;
}

export interface Log {
  id: string;
  timestamp: number;
  activity: ActivityType;
  duration: number;
}

export interface StatisticsState {
  totalTime: number;
  walkingTime: number;
  runningTime: number;
}

export interface AppState {
  isDetecting: boolean;
  currentActivity: ActivityType;
  permissions: PermissionsState;
  settings: SettingsState;
  logs: Log[];
  statistics: StatisticsState;
}

export const initialAppState: AppState = {
  isDetecting: false,
  currentActivity: 'inactive',
  permissions: {
    location: false,
    activity: false,
    notifications: false,
  },
  settings: {
    darkMode: false,
    sensitivity: 'medium',
    notificationsEnabled: true,
  },
  logs: [],
  statistics: {
    totalTime: 0,
    walkingTime: 0,
    runningTime: 0,
  },
};
