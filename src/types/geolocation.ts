// Geolocation and motion detection type definitions

export type ActivityType = 'still' | 'on_foot' | 'walking' | 'running' | 'on_bicycle' | 'in_vehicle' | 'unknown';

export type MotionActivity = {
  activity: ActivityType;
  confidence: number;
  timestamp: string;
};

export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  speed: number;
  heading: number;
  timestamp: string;
}

export interface GeolocationState {
  isTracking: boolean;
  currentActivity: ActivityType;
  activityConfidence: number;
  lastLocation: Location | null;
  activityHistory: MotionActivity[];
}