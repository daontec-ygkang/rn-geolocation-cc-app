/**
 * DashboardScreen Integration Tests
 * Tests for GeolocationService integration
 */

import React from 'react';
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react-native';
import {Alert} from 'react-native';
import {DashboardScreen} from '../DashboardScreen';
import {AppProvider} from '../../contexts/AppContext';
import {ThemeProvider} from '../../theme/ThemeContext';
import GeolocationService from '../../services/GeolocationService';

// Mock GeolocationService
jest.mock('../../services/GeolocationService', () => ({
  __esModule: true,
  default: {
    init: jest.fn().mockResolvedValue(undefined),
    start: jest.fn().mockResolvedValue(undefined),
    stop: jest.fn().mockResolvedValue(undefined),
    isTracking: jest.fn().mockReturnValue(false),
    isInitialized: jest.fn().mockReturnValue(true),
  },
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <AppProvider>
      <ThemeProvider>{component}</ThemeProvider>
    </AppProvider>,
  );
};

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
} as any;

describe('DashboardScreen - GeolocationService Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Service Initialization', () => {
    it('initializes GeolocationService on mount', async () => {
      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });
    });

    it('shows alert when initialization fails', async () => {
      (GeolocationService.init as jest.Mock).mockRejectedValueOnce(
        new Error('Init failed'),
      );

      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          '초기화 실패',
          '모션 감지 서비스를 초기화하지 못했습니다.',
        );
      });
    });

    it('stops service on unmount if tracking', async () => {
      (GeolocationService.isTracking as jest.Mock).mockReturnValue(true);

      const {unmount} = renderWithProviders(
        <DashboardScreen navigation={mockNavigation} />,
      );

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      unmount();

      await waitFor(() => {
        expect(GeolocationService.stop).toHaveBeenCalled();
      });
    });
  });

  describe('Tab Navigation', () => {
    it('renders all three tabs', async () => {
      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(screen.getByText('차량 하차 감지')).toBeTruthy();
        expect(screen.getByText('걷기/뛰기 감지')).toBeTruthy();
        expect(screen.getByText('통합 시나리오')).toBeTruthy();
      });
    });

    it('switches between tabs', async () => {
      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Switch to motion tab
      const motionTab = screen.getByText('걷기/뛰기 감지');
      fireEvent.press(motionTab);

      await waitFor(() => {
        expect(screen.getByTestId('motion-button')).toBeTruthy();
      });

      // Switch to integrated tab
      const integratedTab = screen.getByText('통합 시나리오');
      fireEvent.press(integratedTab);

      await waitFor(() => {
        expect(screen.getByTestId('integrated-button')).toBeTruthy();
      });
    });

    it('stops detection when switching tabs', async () => {
      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Start detection
      const startButton = screen.getByTestId('vehicle-button');
      await act(async () => {
        fireEvent.press(startButton);
      });

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });

      // Switch tabs
      const motionTab = screen.getByText('걷기/뛰기 감지');
      await act(async () => {
        fireEvent.press(motionTab);
      });

      await waitFor(() => {
        expect(GeolocationService.stop).toHaveBeenCalled();
      });
    });
  });

  describe('Start/Stop Detection', () => {
    it('starts detection when button pressed', async () => {
      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Switch to motion tab first
      const motionTab = screen.getByText('걷기/뛰기 감지');
      fireEvent.press(motionTab);

      await waitFor(() => {
        expect(screen.getByTestId('motion-button')).toBeTruthy();
      });

      const startButton = screen.getByTestId('motion-button');

      await act(async () => {
        fireEvent.press(startButton);
      });

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });
    });

    it('stops detection when stop button pressed', async () => {
      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Switch to motion tab
      const motionTab = screen.getByText('걷기/뛰기 감지');
      fireEvent.press(motionTab);

      await waitFor(() => {
        expect(screen.getByTestId('motion-button')).toBeTruthy();
      });

      // Start detection first
      const startButton = screen.getByTestId('motion-button');
      await act(async () => {
        fireEvent.press(startButton);
      });

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });

      // Stop detection
      const stopButton = screen.getByTestId('motion-button');
      await act(async () => {
        fireEvent.press(stopButton);
      });

      await waitFor(() => {
        expect(GeolocationService.stop).toHaveBeenCalled();
      });
    });

    it('disables button when not initialized', async () => {
      (GeolocationService.init as jest.Mock).mockImplementation(
        () => new Promise(() => {}), // Never resolves
      );

      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      // Default tab is vehicle-exit
      const button = screen.getByTestId('vehicle-button');
      expect(button.props.accessibilityState.disabled).toBe(true);
    });

    it('shows error alert when start fails', async () => {
      (GeolocationService.start as jest.Mock).mockRejectedValueOnce(
        new Error('Start failed'),
      );

      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Switch to motion tab
      const motionTab = screen.getByText('걷기/뛰기 감지');
      fireEvent.press(motionTab);

      await waitFor(() => {
        expect(screen.getByTestId('motion-button')).toBeTruthy();
      });

      const startButton = screen.getByTestId('motion-button');

      await act(async () => {
        fireEvent.press(startButton);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          '오류',
          '모션 감지를 시작하지 못했습니다.',
        );
      });
    });

    it('shows error alert when stop fails', async () => {
      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Switch to motion tab
      const motionTab = screen.getByText('걷기/뛰기 감지');
      fireEvent.press(motionTab);

      await waitFor(() => {
        expect(screen.getByTestId('motion-button')).toBeTruthy();
      });

      // Start first
      const startButton = screen.getByTestId('motion-button');
      await act(async () => {
        fireEvent.press(startButton);
      });

      await waitFor(() => {
        expect(GeolocationService.start).toHaveBeenCalled();
      });

      // Mock stop to fail on next call
      (GeolocationService.stop as jest.Mock).mockRejectedValueOnce(
        new Error('Stop failed'),
      );

      // Try to stop
      const stopButton = screen.getByTestId('motion-button');
      await act(async () => {
        fireEvent.press(stopButton);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          '오류',
          '모션 감지를 중지하지 못했습니다.',
        );
      });
    });
  });

  describe('Activity Detection Callback', () => {
    it('updates activity when callback is triggered', async () => {
      let activityCallback: any;

      (GeolocationService.start as jest.Mock).mockImplementation(callback => {
        activityCallback = callback;
        return Promise.resolve();
      });

      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Switch to motion tab
      const motionTab = screen.getByText('걷기/뛰기 감지');
      fireEvent.press(motionTab);

      await waitFor(() => {
        expect(screen.getByTestId('motion-button')).toBeTruthy();
      });

      // Start detection
      const startButton = screen.getByTestId('motion-button');
      await act(async () => {
        fireEvent.press(startButton);
      });

      await waitFor(() => {
        expect(activityCallback).toBeDefined();
      });

      // Trigger walking activity
      await act(async () => {
        activityCallback('walking');
      });

      await waitFor(() => {
        expect(screen.getByText('걷기 감지됨')).toBeTruthy();
      });

      // Trigger running activity
      await act(async () => {
        activityCallback('running');
      });

      await waitFor(() => {
        expect(screen.getByText('뛰기 감지됨')).toBeTruthy();
      });
    });
  });

  describe('UI State', () => {
    it('displays correct badge when not detecting', async () => {
      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Default tab has vehicle-badge
      const badge = screen.getByTestId('vehicle-badge');
      expect(badge).toBeTruthy();
    });

    it('shows correct status text for each tab', async () => {
      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // Vehicle tab
      expect(screen.getByText('차량 상태 모니터링 대기 중')).toBeTruthy();

      // Motion tab
      const motionTab = screen.getByText('걷기/뛰기 감지');
      fireEvent.press(motionTab);
      await waitFor(() => {
        expect(screen.getByText('모션 감지 대기 중')).toBeTruthy();
      });

      // Integrated tab
      const integratedTab = screen.getByText('통합 시나리오');
      fireEvent.press(integratedTab);
      await waitFor(() => {
        expect(screen.getByText('통합 시나리오 대기 중')).toBeTruthy();
      });
    });

    it('displays info card for each tab', async () => {
      renderWithProviders(<DashboardScreen navigation={mockNavigation} />);

      await waitFor(() => {
        expect(GeolocationService.init).toHaveBeenCalled();
      });

      // All tabs should have info card
      expect(screen.getByText('💡 테스트 목적:')).toBeTruthy();
    });
  });
});
