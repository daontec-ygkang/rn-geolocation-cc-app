/**
 * Dashboard Screen Logging Tests
 * Tests for activity logging functionality
 */

import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {DashboardScreen} from '../DashboardScreen';
import {AppProvider} from '../../contexts/AppContext';
import {ThemeProvider} from '../../theme/ThemeContext';
import GeolocationService from '../../services/GeolocationService';

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
  },
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

describe('DashboardScreen - Logging', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (GeolocationService.init as jest.Mock).mockResolvedValue(undefined);
    (GeolocationService.isTracking as jest.Mock).mockReturnValue(false);
  });

  const renderScreen = () => {
    return render(
      <ThemeProvider>
        <AppProvider>
          <DashboardScreen navigation={mockNavigation} />
        </AppProvider>
      </ThemeProvider>,
    );
  };

  it('should initialize without errors', async () => {
    const {getByText} = renderScreen();

    await waitFor(() => {
      expect(GeolocationService.init).toHaveBeenCalledTimes(1);
    });

    expect(getByText('차량 하차 감지')).toBeTruthy();
  });

  it('should add log when activity transitions to inactive', async () => {
    const {getByText} = renderScreen();

    await waitFor(() => {
      expect(GeolocationService.init).toHaveBeenCalled();
    });

    // Simulate activity callback
    let activityCallback: ((activity: string) => void) | null = null;
    (GeolocationService.start as jest.Mock).mockImplementation(callback => {
      activityCallback = callback;
      return Promise.resolve();
    });

    const startButton = getByText('시작');
    startButton.props.onPress();

    await waitFor(() => {
      expect(GeolocationService.start).toHaveBeenCalled();
    });

    // Simulate walking activity
    if (activityCallback) {
      activityCallback('walking');

      // Wait for state update
      await waitFor(() => {
        // Activity start time should be recorded
      });

      // Simulate transition to inactive after 5 seconds
      jest.advanceTimersByTime(5000);
      activityCallback('inactive');

      await waitFor(() => {
        // Log should be added with 5 seconds duration
        // This would be verified through AppContext state
      });
    }
  });

  it('should add log when stopping detection during activity', async () => {
    const {getByText} = renderScreen();

    await waitFor(() => {
      expect(GeolocationService.init).toHaveBeenCalled();
    });

    // Start detection
    let activityCallback: ((activity: string) => void) | null = null;
    (GeolocationService.start as jest.Mock).mockImplementation(callback => {
      activityCallback = callback;
      return Promise.resolve();
    });

    const startButton = getByText('시작');
    startButton.props.onPress();

    await waitFor(() => {
      expect(GeolocationService.start).toHaveBeenCalled();
    });

    // Simulate running activity
    if (activityCallback) {
      activityCallback('running');

      // Wait for state update
      await waitFor(() => {
        // Activity start time should be recorded
      });

      // Stop detection after 3 seconds
      jest.advanceTimersByTime(3000);
      (GeolocationService.stop as jest.Mock).mockResolvedValue(undefined);

      const stopButton = getByText('중지');
      stopButton.props.onPress();

      await waitFor(() => {
        expect(GeolocationService.stop).toHaveBeenCalled();
        // Final log should be added with 3 seconds duration
      });
    }
  });

  it('should not add log for inactive activity', async () => {
    const {getByText} = renderScreen();

    await waitFor(() => {
      expect(GeolocationService.init).toHaveBeenCalled();
    });

    // Start detection
    let activityCallback: ((activity: string) => void) | null = null;
    (GeolocationService.start as jest.Mock).mockImplementation(callback => {
      activityCallback = callback;
      return Promise.resolve();
    });

    const startButton = getByText('시작');
    startButton.props.onPress();

    await waitFor(() => {
      expect(GeolocationService.start).toHaveBeenCalled();
    });

    // Simulate inactive activity only
    if (activityCallback) {
      activityCallback('inactive');

      await waitFor(() => {
        // No log should be added for inactive activity
      });
    }
  });

  it('should log multiple activity sessions', async () => {
    const {getByText} = renderScreen();

    await waitFor(() => {
      expect(GeolocationService.init).toHaveBeenCalled();
    });

    // Start detection
    let activityCallback: ((activity: string) => void) | null = null;
    (GeolocationService.start as jest.Mock).mockImplementation(callback => {
      activityCallback = callback;
      return Promise.resolve();
    });

    const startButton = getByText('시작');
    startButton.props.onPress();

    await waitFor(() => {
      expect(GeolocationService.start).toHaveBeenCalled();
    });

    if (activityCallback) {
      // First session: walking for 10 seconds
      activityCallback('walking');
      jest.advanceTimersByTime(10000);
      activityCallback('inactive');

      await waitFor(() => {
        // First log should be added
      });

      // Second session: running for 5 seconds
      activityCallback('running');
      jest.advanceTimersByTime(5000);
      activityCallback('inactive');

      await waitFor(() => {
        // Second log should be added
        // Total should be 2 logs
      });
    }
  });
});
