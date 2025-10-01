/**
 * GeolocationService Tests
 * Comprehensive test suite for GeolocationService
 */

import {GeolocationService} from '../GeolocationService';
import BackgroundGeolocation from 'react-native-background-geolocation';
import type {MotionActivityEvent} from 'react-native-background-geolocation';

// Mock react-native-background-geolocation
jest.mock('react-native-background-geolocation', () => ({
  ready: jest.fn().mockResolvedValue({}),
  start: jest.fn().mockResolvedValue({enabled: true}),
  stop: jest.fn().mockResolvedValue({enabled: false}),
  onActivityChange: jest.fn().mockReturnValue({remove: jest.fn()}),
  getState: jest.fn().mockResolvedValue({enabled: false}),
  requestPermission: jest.fn().mockResolvedValue(1),
  getProviderState: jest.fn().mockResolvedValue({enabled: true}),
  DESIRED_ACCURACY_HIGH: -1,
  LOG_LEVEL_VERBOSE: 5,
}));

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(async () => {
    // Create new service instance for each test
    service = new GeolocationService();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    // Clean up after each test
    if (service.isTracking()) {
      await service.stop();
    }
    await service.reset();
  });

  describe('Initialization', () => {
    it('should initialize service successfully', async () => {
      await service.init();

      expect(service.isInitialized()).toBe(true);
      expect(BackgroundGeolocation.ready).toHaveBeenCalledWith(
        expect.objectContaining({
          desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
          distanceFilter: 10,
          stopTimeout: 5,
          stopOnTerminate: false,
          startOnBoot: true,
        }),
      );
    });

    it('should allow custom configuration', async () => {
      await service.init({
        desiredAccuracy: -2,
        distanceFilter: 20,
        debug: false,
      });

      expect(BackgroundGeolocation.ready).toHaveBeenCalledWith(
        expect.objectContaining({
          desiredAccuracy: -2,
          distanceFilter: 20,
          debug: false,
        }),
      );
    });

    it('should not initialize twice', async () => {
      await service.init();
      await service.init();

      expect(BackgroundGeolocation.ready).toHaveBeenCalledTimes(1);
    });

    it('should handle initialization errors', async () => {
      const error = new Error('Init failed');
      (BackgroundGeolocation.ready as jest.Mock).mockRejectedValueOnce(error);

      await expect(service.init()).rejects.toThrow('Init failed');
      expect(service.isInitialized()).toBe(false);
    });
  });

  describe('Start/Stop Tracking', () => {
    beforeEach(async () => {
      await service.init();
    });

    it('should start tracking successfully', async () => {
      const onActivity = jest.fn();
      await service.start(onActivity);

      expect(service.isTracking()).toBe(true);
      expect(BackgroundGeolocation.start).toHaveBeenCalled();
      expect(BackgroundGeolocation.onActivityChange).toHaveBeenCalled();
    });

    it('should throw error if not initialized', async () => {
      const uninitializedService = new GeolocationService();
      const onActivity = jest.fn();

      await expect(uninitializedService.start(onActivity)).rejects.toThrow(
        'GeolocationService must be initialized before starting',
      );
    });

    it('should not start twice', async () => {
      const onActivity = jest.fn();
      await service.start(onActivity);
      await service.start(onActivity);

      expect(BackgroundGeolocation.start).toHaveBeenCalledTimes(1);
    });

    it('should stop tracking successfully', async () => {
      const onActivity = jest.fn();
      await service.start(onActivity);
      await service.stop();

      expect(service.isTracking()).toBe(false);
      expect(BackgroundGeolocation.stop).toHaveBeenCalled();
    });

    it('should handle stop when not tracking', async () => {
      await service.stop();

      expect(BackgroundGeolocation.stop).not.toHaveBeenCalled();
    });

    it('should clean up subscriptions on stop', async () => {
      const mockSubscription = {remove: jest.fn()};
      (BackgroundGeolocation.onActivityChange as jest.Mock).mockReturnValue(
        mockSubscription,
      );

      const onActivity = jest.fn();
      await service.start(onActivity);
      await service.stop();

      expect(mockSubscription.remove).toHaveBeenCalled();
    });
  });

  describe('Activity Classification', () => {
    beforeEach(async () => {
      await service.init();
    });

    it('should classify walking activity', () => {
      const event: MotionActivityEvent = {
        activity: 'walking',
        confidence: 90,
      };

      const result = service.classifyActivity(event);
      expect(result).toBe('walking');
    });

    it('should classify on_foot as walking', () => {
      const event: MotionActivityEvent = {
        activity: 'on_foot',
        confidence: 85,
      };

      const result = service.classifyActivity(event);
      expect(result).toBe('walking');
    });

    it('should classify running activity', () => {
      const event: MotionActivityEvent = {
        activity: 'running',
        confidence: 80,
      };

      const result = service.classifyActivity(event);
      expect(result).toBe('running');
    });

    it('should classify still as inactive', () => {
      const event: MotionActivityEvent = {
        activity: 'still',
        confidence: 95,
      };

      const result = service.classifyActivity(event);
      expect(result).toBe('inactive');
    });

    it('should classify in_vehicle as inactive', () => {
      const event: MotionActivityEvent = {
        activity: 'in_vehicle',
        confidence: 92,
      };

      const result = service.classifyActivity(event);
      expect(result).toBe('inactive');
    });

    it('should return inactive for low confidence', () => {
      const event: MotionActivityEvent = {
        activity: 'walking',
        confidence: 50,
      };

      const result = service.classifyActivity(event);
      expect(result).toBe('inactive');
    });

    it('should handle unknown activity types', () => {
      const event: MotionActivityEvent = {
        activity: 'unknown' as any,
        confidence: 85,
      };

      const result = service.classifyActivity(event);
      expect(result).toBe('inactive');
    });
  });

  describe('Activity Callback', () => {
    beforeEach(async () => {
      await service.init();
    });

    it('should trigger callback on high confidence activity', async () => {
      const onActivity = jest.fn();
      await service.start(onActivity);

      // Simulate activity change
      const activityHandler = (BackgroundGeolocation.onActivityChange as jest.Mock).mock
        .calls[0][0];

      activityHandler({
        activity: 'walking',
        confidence: 90,
      });

      expect(onActivity).toHaveBeenCalledWith('walking');
    });

    it('should not trigger callback on low confidence', async () => {
      const onActivity = jest.fn();
      await service.start(onActivity);

      const activityHandler = (BackgroundGeolocation.onActivityChange as jest.Mock).mock
        .calls[0][0];

      activityHandler({
        activity: 'walking',
        confidence: 50,
      });

      expect(onActivity).not.toHaveBeenCalled();
    });

    it('should trigger callback for running activity', async () => {
      const onActivity = jest.fn();
      await service.start(onActivity);

      const activityHandler = (BackgroundGeolocation.onActivityChange as jest.Mock).mock
        .calls[0][0];

      activityHandler({
        activity: 'running',
        confidence: 85,
      });

      expect(onActivity).toHaveBeenCalledWith('running');
    });
  });

  describe('Utility Methods', () => {
    it('should return tracking state', async () => {
      await service.init();
      expect(service.isTracking()).toBe(false);

      await service.start(jest.fn());
      expect(service.isTracking()).toBe(true);

      await service.stop();
      expect(service.isTracking()).toBe(false);
    });

    it('should return initialized state', async () => {
      expect(service.isInitialized()).toBe(false);

      await service.init();
      expect(service.isInitialized()).toBe(true);
    });

    it('should get current state', async () => {
      await service.init();
      const state = await service.getState();

      expect(BackgroundGeolocation.getState).toHaveBeenCalled();
      expect(state).toBeDefined();
    });

    it('should request permission', async () => {
      await service.init();
      const status = await service.requestPermission();

      expect(BackgroundGeolocation.requestPermission).toHaveBeenCalled();
      expect(status).toBe(1);
    });

    it('should get provider state', async () => {
      await service.init();
      const providerState = await service.getProviderState();

      expect(BackgroundGeolocation.getProviderState).toHaveBeenCalled();
      expect(providerState).toBeDefined();
    });

    it('should reset service state', async () => {
      await service.init();
      await service.start(jest.fn());
      await service.reset();

      expect(service.isInitialized()).toBe(false);
      expect(service.isTracking()).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid start/stop cycles', async () => {
      await service.init();
      const onActivity = jest.fn();

      await service.start(onActivity);
      await service.stop();
      await service.start(onActivity);
      await service.stop();

      expect(service.isTracking()).toBe(false);
    });

    it('should handle multiple activity callbacks', async () => {
      await service.init();
      const onActivity = jest.fn();
      await service.start(onActivity);

      const activityHandler = (BackgroundGeolocation.onActivityChange as jest.Mock).mock
        .calls[0][0];

      // Multiple rapid activity changes
      activityHandler({activity: 'walking', confidence: 90});
      activityHandler({activity: 'running', confidence: 85});
      activityHandler({activity: 'walking', confidence: 92});

      expect(onActivity).toHaveBeenCalledTimes(3);
      expect(onActivity).toHaveBeenNthCalledWith(1, 'walking');
      expect(onActivity).toHaveBeenNthCalledWith(2, 'running');
      expect(onActivity).toHaveBeenNthCalledWith(3, 'walking');
    });
  });
});
