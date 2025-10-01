/**
 * PermissionsScreen Tests
 */

import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react-native';
import {Alert} from 'react-native';
import {PermissionsScreen} from '../PermissionsScreen';
import {AppProvider} from '../../contexts/AppContext';
import {ThemeProvider} from '../../theme/ThemeContext';

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

describe('PermissionsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    expect(screen.getByTestId('permissions-screen')).toBeTruthy();
  });

  it('displays header and subtitle', () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    expect(screen.getByText('권한 설정')).toBeTruthy();
    expect(
      screen.getByText('앱이 제대로 작동하려면 아래 권한이 필요합니다'),
    ).toBeTruthy();
  });

  it('displays all three permission cards', () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    expect(screen.getByTestId('location-permission-card')).toBeTruthy();
    expect(screen.getByTestId('activity-permission-card')).toBeTruthy();
    expect(screen.getByTestId('notifications-permission-card')).toBeTruthy();
  });

  it('displays location permission details', () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    expect(screen.getByText('위치 권한')).toBeTruthy();
    expect(
      screen.getByText('차량 하차 및 모션 감지를 위해 필요합니다'),
    ).toBeTruthy();
    expect(screen.getByText('📍')).toBeTruthy();
  });

  it('displays activity permission details', () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    expect(screen.getByText('활동 인식 권한')).toBeTruthy();
    expect(
      screen.getByText('걷기와 뛰기 활동을 감지하기 위해 필요합니다'),
    ).toBeTruthy();
    expect(screen.getByText('🏃')).toBeTruthy();
  });

  it('displays notifications permission details', () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    expect(screen.getByText('알림 권한')).toBeTruthy();
    expect(
      screen.getByText('활동 감지 알림을 받기 위해 필요합니다'),
    ).toBeTruthy();
    expect(screen.getByText('🔔')).toBeTruthy();
  });

  it('displays info card with permission guidelines', () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    expect(screen.getByText('💡 권한 안내')).toBeTruthy();
    expect(
      screen.getByText('• 위치 권한: 백그라운드에서도 위치를 추적합니다'),
    ).toBeTruthy();
    expect(
      screen.getByText('• 활동 인식: 걷기, 뛰기 등의 활동을 자동으로 감지합니다'),
    ).toBeTruthy();
  });

  it('shows alert when location permission is requested', async () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    const locationCard = screen.getByTestId('location-permission-card');
    const requestButton = screen.getByTestId(
      'location-permission-card-request-button',
    );

    fireEvent.press(requestButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '권한 요청',
        '위치 권한 요청 기능은 Phase 2.3에서 구현됩니다.',
        expect.any(Array),
      );
    });
  });

  it('shows alert when activity permission is requested', async () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    const requestButton = screen.getByTestId(
      'activity-permission-card-request-button',
    );

    fireEvent.press(requestButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '권한 요청',
        '활동 인식 권한 요청 기능은 Phase 2.3에서 구현됩니다.',
        expect.any(Array),
      );
    });
  });

  it('shows alert when notifications permission is requested', async () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    const requestButton = screen.getByTestId(
      'notifications-permission-card-request-button',
    );

    fireEvent.press(requestButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '권한 요청',
        '알림 권한 요청 기능은 Phase 2.3에서 구현됩니다.',
        expect.any(Array),
      );
    });
  });

  it('initially shows all permissions as not requested', () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    const notRequestedBadges = screen.getAllByText('요청 필요');
    expect(notRequestedBadges.length).toBe(3);
  });

  it('renders with theme integration', () => {
    renderWithProviders(<PermissionsScreen navigation={mockNavigation} />);
    const container = screen.getByTestId('permissions-screen');
    expect(container).toBeTruthy();
    expect(container.props.style).toBeDefined();
  });
});
