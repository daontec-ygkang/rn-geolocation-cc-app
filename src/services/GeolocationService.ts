/**
 * GeolocationService
 * Service for managing background geolocation and motion detection
 * Uses react-native-background-geolocation for activity tracking
 */

import BackgroundGeolocation, {
  Location,
  MotionActivityEvent,
  State,
  Subscription,
} from 'react-native-background-geolocation';
import {ActivityType} from '../types/AppState';

type ActivityCallback = (activity: ActivityType) => void;

interface GeolocationConfig {
  desiredAccuracy?: number;
  distanceFilter?: number;
  stopTimeout?: number;
  debug?: boolean;
  enableHeadless?: boolean;
  stopOnTerminate?: boolean;
  startOnBoot?: boolean;
}

export class GeolocationService {
  private tracking: boolean = false;
  private activityCallback?: ActivityCallback;
  private activitySubscription?: Subscription;
  private initialized: boolean = false;

  /**
   * Initialize BackgroundGeolocation with configuration
   * Must be called before start()
   */
  async init(config?: GeolocationConfig): Promise<void> {
    if (this.initialized) {
      console.warn('[GeolocationService] Already initialized');
      return;
    }

    try {
      await BackgroundGeolocation.ready({
        // Location settings
        desiredAccuracy: config?.desiredAccuracy ?? BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: config?.distanceFilter ?? 10,
        stopTimeout: config?.stopTimeout ?? 5,

        // Debug settings
        debug: config?.debug ?? __DEV__,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,

        // Background settings
        stopOnTerminate: config?.stopOnTerminate ?? false,
        startOnBoot: config?.startOnBoot ?? true,
        enableHeadless: config?.enableHeadless ?? true,

        // Notification for Android
        notification: {
          title: '모션 감지 중',
          text: '걷기/뛰기 활동을 감지하고 있습니다',
        },

        // Activity Recognition settings
        activityRecognitionInterval: 10000, // 10 seconds
        stopDetectionDelay: 1, // minutes
      });

      this.initialized = true;
      console.log('[GeolocationService] Initialized successfully');
    } catch (error) {
      console.error('[GeolocationService] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Start motion tracking
   * @param onActivity Callback for activity changes
   */
  async start(onActivity: ActivityCallback): Promise<void> {
    if (!this.initialized) {
      throw new Error('GeolocationService must be initialized before starting');
    }

    if (this.tracking) {
      console.warn('[GeolocationService] Already tracking');
      return;
    }

    this.activityCallback = onActivity;

    // Subscribe to activity change events
    this.activitySubscription = BackgroundGeolocation.onActivityChange(
      this.handleActivityChange,
    );

    // Start tracking
    const state = await BackgroundGeolocation.start();
    this.tracking = true;

    console.log('[GeolocationService] Started tracking:', state);
  }

  /**
   * Stop motion tracking
   */
  async stop(): Promise<void> {
    if (!this.tracking) {
      console.warn('[GeolocationService] Not currently tracking');
      return;
    }

    // Unsubscribe from events
    if (this.activitySubscription) {
      this.activitySubscription.remove();
      this.activitySubscription = undefined;
    }

    // Stop tracking
    await BackgroundGeolocation.stop();
    this.tracking = false;
    this.activityCallback = undefined;

    console.log('[GeolocationService] Stopped tracking');
  }

  /**
   * Check if currently tracking
   */
  isTracking(): boolean {
    return this.tracking;
  }

  /**
   * Check if service is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Get current location state
   */
  async getState(): Promise<State> {
    return BackgroundGeolocation.getState();
  }

  /**
   * Handle activity change events from BackgroundGeolocation
   */
  private handleActivityChange = (event: MotionActivityEvent) => {
    console.log(
      '[GeolocationService] Activity changed:',
      event.activity,
      'confidence:',
      event.confidence,
    );

    const activity = this.classifyActivity(event);

    // Only trigger callback if confidence is high enough
    if (this.activityCallback && event.confidence >= 70) {
      this.activityCallback(activity);
    }
  };

  /**
   * Classify motion activity based on event data
   * @param event MotionActivityEvent from BackgroundGeolocation
   * @returns ActivityType ('inactive' | 'walking' | 'running')
   */
  classifyActivity(event: MotionActivityEvent): ActivityType {
    const {activity, confidence} = event;

    // Low confidence = inactive
    if (confidence < 70) {
      return 'inactive';
    }

    // Map activity types to our internal types
    switch (activity) {
      case 'on_foot':
      case 'walking':
        return 'walking';
      case 'running':
        return 'running';
      case 'still':
      case 'in_vehicle':
      case 'on_bicycle':
      default:
        return 'inactive';
    }
  }

  /**
   * Reset service state (for testing)
   */
  async reset(): Promise<void> {
    if (this.tracking) {
      await this.stop();
    }
    this.initialized = false;
    this.activityCallback = undefined;
    this.activitySubscription = undefined;
  }

  /**
   * Request location permission
   * Returns permission status
   */
  async requestPermission(): Promise<number> {
    try {
      const status = await BackgroundGeolocation.requestPermission();
      console.log('[GeolocationService] Permission status:', status);
      return status;
    } catch (error) {
      console.error('[GeolocationService] Permission request failed:', error);
      throw error;
    }
  }

  /**
   * Get current provider state (GPS enabled, etc.)
   */
  async getProviderState(): Promise<any> {
    return BackgroundGeolocation.getProviderState();
  }
}

// Singleton instance
export default new GeolocationService();
