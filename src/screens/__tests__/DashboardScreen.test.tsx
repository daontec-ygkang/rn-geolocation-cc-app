/**
 * DashboardScreen Tests
 */

import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react-native';
import {Alert} from 'react-native';
import {DashboardScreen} from '../DashboardScreen';
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

describe('DashboardScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithProviders(<DashboardScreen navigation={mockNavigation} />);
    expect(screen.getByTestId('dashboard-screen')).toBeTruthy();
  });

  it('displays all main components', () => {
    renderWithProviders(<DashboardScreen navigation={mockNavigation} />);
    expect(screen.getByTestId('activity-status')).toBeTruthy();
    expect(screen.getByTestId('control-buttons')).toBeTruthy();
    expect(screen.getByTestId('statistics-card')).toBeTruthy();
  });

  it('shows start button initially', () => {
    renderWithProviders(<DashboardScreen navigation={mockNavigation} />);
    expect(screen.getByTestId('start-button')).toBeTruthy();
    expect(screen.getByText('감지 시작')).toBeTruthy();
  });

  it('displays information card with usage instructions', () => {
    renderWithProviders(<DashboardScreen navigation={mockNavigation} />);
    expect(screen.getByText('💡 사용 안내')).toBeTruthy();
    expect(
      screen.getByText('• 감지 시작 버튼을 눌러 활동 감지를 시작하세요'),
    ).toBeTruthy();
    expect(
      screen.getByText('• 걷기와 뛰기 활동이 자동으로 감지됩니다'),
    ).toBeTruthy();
  });

  it('shows alert when starting without permissions', async () => {
    renderWithProviders(<DashboardScreen navigation={mockNavigation} />);
    const startButton = screen.getByTestId('start-button');

    fireEvent.press(startButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '권한 필요',
        '위치 및 활동 인식 권한이 필요합니다. 설정 화면에서 권한을 허용해주세요.',
        expect.any(Array),
      );
    });
  });

  it('displays initial inactive status', () => {
    renderWithProviders(<DashboardScreen navigation={mockNavigation} />);
    expect(screen.getByText('대기 중')).toBeTruthy();
  });

  it('displays zero statistics initially', () => {
    renderWithProviders(<DashboardScreen navigation={mockNavigation} />);
    const zeroValues = screen.getAllByText('0분');
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  it('renders with theme integration', () => {
    renderWithProviders(<DashboardScreen navigation={mockNavigation} />);
    const container = screen.getByTestId('dashboard-screen');
    expect(container).toBeTruthy();
    // Theme styles are applied
    expect(container.props.style).toBeDefined();
  });

  it('displays activity status section', () => {
    renderWithProviders(<DashboardScreen navigation={mockNavigation} />);
    expect(screen.getByText('현재 활동')).toBeTruthy();
    expect(screen.getByTestId('activity-badge')).toBeTruthy();
  });

  it('displays statistics section with labels', () => {
    renderWithProviders(<DashboardScreen navigation={mockNavigation} />);
    expect(screen.getByText('활동 통계')).toBeTruthy();
    expect(screen.getByText('총 시간')).toBeTruthy();
    expect(screen.getByText('걷기')).toBeTruthy();
    expect(screen.getByText('뛰기')).toBeTruthy();
  });
});
