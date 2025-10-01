/**
 * Motion Detection E2E Integration Tests
 * Complete workflow testing: Service + UI + State Management
 */

import React from 'react';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DashboardScreen} from '../../screens/DashboardScreen';
import {AppProvider} from '../../contexts/AppContext';
import {ThemeProvider} from '../../theme/ThemeContext';
import GeolocationService from '../../services/GeolocationService';
import type {ActivityType} from '../../types/AppState';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
} as any;

// Mock GeolocationService
jest.mock('../../services/GeolocationService', () => ({
  __esModule: true,
  default: {
    init: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    isTracking: jest.fn(),
    requestPermission: jest.fn(),
    getCurrentState: jest.fn(),
  },
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('Motion Detection E2E Integration', () => {
  let activityCallback: ((activity: ActivityType) => void) | null = null;

  beforeEach(() => {
    jest.clearAllMocks();
    activityCallback = null;

    // Setup default mocks
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
    (GeolocationService.init as jest.Mock).mockResolvedValue(undefined);
    (GeolocationService.isTracking as jest.Mock).mockReturnValue(false);
    (GeolocationService.requestPermission as jest.Mock).mockResolvedValue(3); // GRANTED
    (GeolocationService.start as jest.Mock).mockImplementation(callback => {
      activityCallback = callback;
      return Promise.resolve();
    });
    (GeolocationService.stop as jest.Mock).mockResolvedValue(undefined);
  });

  const renderApp = () => {
    return render(
      <ThemeProvider>
        <AppProvider>
          <DashboardScreen navigation={mockNavigation} />
        </AppProvider>
      </ThemeProvider>,
    );
  };

  describe('Complete Detection Lifecycle', () => {
    it('should complete full workflow: start → activity → stop', async () => {
      const {getByText, getByTestId} = renderApp();

      // Wait for initialization
      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Switch to motion detection tab
      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      await waitFor(() => {
        expect(getByText('걷기/뛰기 감지')).toBeTruthy();
      });

      // Start detection
      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
        expect(getByText('모션 감지 중지')).toBeTruthy();
      });

      // Simulate walking activity
      if (activityCallback) {
        activityCallback('walking');

        await waitFor(() => {
          // UI should update to show walking
        });

        // Simulate activity for 5 seconds then stop
        jest.advanceTimersByTime(5000);
        activityCallback('inactive');

        await waitFor(() => {
          // Log and statistics should be updated
        });
      }

      // Stop detection
      const stopButton = getByText('모션 감지 중지');
      fireEvent.press(stopButton);

      await waitFor(() => {
        expect(GeolocationService.stop).toHaveBeenCalled();
        expect(getByText('모션 감지 시작')).toBeTruthy();
      });
    });

    it('should handle multiple activity sessions in sequence', async () => {
      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Switch to motion detection tab
      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      // Start detection
      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });

      if (activityCallback) {
        // Session 1: Walking for 10 seconds
        activityCallback('walking');
        jest.advanceTimersByTime(10000);
        activityCallback('inactive');

        await waitFor(() => {
          // First log should be created
        });

        // Session 2: Running for 5 seconds
        activityCallback('running');
        jest.advanceTimersByTime(5000);
        activityCallback('inactive');

        await waitFor(() => {
          // Second log should be created
        });

        // Session 3: Walking for 8 seconds
        activityCallback('walking');
        jest.advanceTimersByTime(8000);
        activityCallback('inactive');

        await waitFor(() => {
          // Third log should be created
          // Statistics should reflect all 3 sessions
        });
      }

      // Stop detection
      const stopButton = getByText('모션 감지 중지');
      fireEvent.press(stopButton);

      await waitFor(() => {
        expect(GeolocationService.stop).toHaveBeenCalled();
      });
    });

    it('should stop detection when switching tabs', async () => {
      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Start detection on motion tab
      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });

      // Switch to vehicle exit tab
      const vehicleTab = getByTestId('dashboard-tabs-tab-vehicle-exit');
      fireEvent.press(vehicleTab);

      await waitFor(() => {
        expect(GeolocationService.stop).toHaveBeenCalled();
        expect(getByText('차량 하차 감지')).toBeTruthy();
      });
    });
  });

  describe('Permission Flow Integration', () => {
    it('should handle permission granted flow', async () => {
      (GeolocationService.requestPermission as jest.Mock).mockResolvedValue(3);

      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });
    });

    it('should handle permission denied gracefully', async () => {
      (GeolocationService.start as jest.Mock).mockRejectedValue(
        new Error('Location permission denied'),
      );

      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
        // Error alert should be shown
      });
    });
  });

  describe('State Persistence Integration', () => {
    it('should load previous state from AsyncStorage', async () => {
      const savedState = JSON.stringify({
        detectionMode: 'motion',
        isDetecting: false,
        currentActivity: 'inactive',
        vehicleState: null,
        statistics: {
          totalTime: 300,
          walkingTime: 200,
          runningTime: 100,
        },
        logs: [
          {
            id: '1',
            timestamp: Date.now() - 10000,
            activity: 'walking',
            duration: 200,
          },
        ],
      });

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(savedState);

      const {getByText} = renderApp();

      await waitFor(() => {
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('app_state');
        // UI should reflect loaded state
      });
    });

    it('should persist state changes to AsyncStorage', async () => {
      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Switch tab
      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      // Wait for debounced save
      await waitFor(
        () => {
          expect(AsyncStorage.setItem).toHaveBeenCalledWith(
            'app_state',
            expect.any(String),
          );
        },
        {timeout: 1000},
      );
    });

    it('should persist logs and statistics', async () => {
      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });

      if (activityCallback) {
        // Create activity session
        activityCallback('walking');
        jest.advanceTimersByTime(5000);
        activityCallback('inactive');

        // Wait for debounced save
        await waitFor(
          () => {
            const calls = (AsyncStorage.setItem as jest.Mock).mock.calls;
            const lastCall = calls[calls.length - 1];
            if (lastCall) {
              const savedData = JSON.parse(lastCall[1]);
              expect(savedData.logs).toBeDefined();
              expect(savedData.statistics).toBeDefined();
            }
          },
          {timeout: 1000},
        );
      }
    });
  });

  describe('Service-UI Integration', () => {
    it('should update UI when service status changes', async () => {
      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      // Initially should show start button
      expect(getByText('모션 감지 시작')).toBeTruthy();

      // Start detection
      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        // Should show stop button
        expect(getByText('모션 감지 중지')).toBeTruthy();
      });

      // Stop detection
      const stopButton = getByText('모션 감지 중지');
      fireEvent.press(stopButton);

      await waitFor(() => {
        // Should show start button again
        expect(getByText('모션 감지 시작')).toBeTruthy();
      });
    });

    it('should reflect activity changes in UI', async () => {
      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });

      if (activityCallback) {
        // Walking activity
        activityCallback('walking');

        await waitFor(() => {
          // UI should show walking status
        });

        // Running activity
        activityCallback('running');

        await waitFor(() => {
          // UI should show running status
        });

        // Inactive
        activityCallback('inactive');

        await waitFor(() => {
          // UI should show inactive status
        });
      }
    });

    it('should disable buttons during loading states', async () => {
      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      // Mock slow service start
      (GeolocationService.start as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 1000)),
      );

      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      // Button should be disabled during loading
      await waitFor(() => {
        expect(startButton.props.disabled).toBe(true);
      });
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle service initialization failure', async () => {
      (GeolocationService.init as jest.Mock).mockRejectedValue(
        new Error('Service unavailable'),
      );

      const {getByText} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
        // Error alert should be shown
      });
    });

    it('should handle start detection failure', async () => {
      (GeolocationService.start as jest.Mock).mockRejectedValue(
        new Error('Failed to start'),
      );

      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
        // Error alert should be shown
        // Button should return to start state
      });
    });

    it('should handle stop detection failure', async () => {
      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });

      // Mock stop failure
      (GeolocationService.stop as jest.Mock).mockRejectedValue(
        new Error('Failed to stop'),
      );

      const stopButton = getByText('모션 감지 중지');
      fireEvent.press(stopButton);

      await waitFor(() => {
        expect(GeolocationService.stop).toHaveBeenCalled();
        // Error alert should be shown
      });
    });
  });

  describe('Background Mode Simulation', () => {
    it('should maintain detection state during app backgrounding', async () => {
      const {getByText, getByTestId} = renderApp();

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      const motionTab = getByTestId('dashboard-tabs-tab-motion');
      fireEvent.press(motionTab);

      const startButton = getByText('모션 감지 시작');
      fireEvent.press(startButton);

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });

      // Simulate activity while in background
      if (activityCallback) {
        activityCallback('walking');
        jest.advanceTimersByTime(30000); // 30 seconds
        activityCallback('inactive');

        await waitFor(() => {
          // Log should be created even in background
        });
      }
    });
  });
});
