/**
 * PermissionCard Component Tests
 */

import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {PermissionCard} from '../PermissionCard';
import {ThemeProvider} from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PermissionCard', () => {
  const mockOnRequest = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithTheme(
      <PermissionCard
        title="위치 권한"
        description="모션 감지를 위해 필요합니다"
        icon="📍"
        status="not-requested"
        onRequest={mockOnRequest}
        testID="test-permission-card"
      />,
    );
    expect(screen.getByTestId('test-permission-card')).toBeTruthy();
  });

  it('displays permission details', () => {
    renderWithTheme(
      <PermissionCard
        title="위치 권한"
        description="모션 감지를 위해 필요합니다"
        icon="📍"
        status="not-requested"
        onRequest={mockOnRequest}
      />,
    );
    expect(screen.getByText('위치 권한')).toBeTruthy();
    expect(screen.getByText('모션 감지를 위해 필요합니다')).toBeTruthy();
    expect(screen.getByText('📍')).toBeTruthy();
  });

  it('shows "요청 필요" badge when not requested', () => {
    renderWithTheme(
      <PermissionCard
        title="위치 권한"
        description="Test"
        icon="📍"
        status="not-requested"
        onRequest={mockOnRequest}
        testID="test-card"
      />,
    );
    expect(screen.getByText('요청 필요')).toBeTruthy();
  });

  it('shows "허용됨" badge when granted', () => {
    renderWithTheme(
      <PermissionCard
        title="위치 권한"
        description="Test"
        icon="📍"
        status="granted"
        onRequest={mockOnRequest}
        testID="test-card"
      />,
    );
    expect(screen.getByText('허용됨')).toBeTruthy();
  });

  it('shows "거부됨" badge when denied', () => {
    renderWithTheme(
      <PermissionCard
        title="위치 권한"
        description="Test"
        icon="📍"
        status="denied"
        onRequest={mockOnRequest}
        testID="test-card"
      />,
    );
    expect(screen.getByText('거부됨')).toBeTruthy();
  });

  it('shows request button when not requested', () => {
    renderWithTheme(
      <PermissionCard
        title="위치 권한"
        description="Test"
        icon="📍"
        status="not-requested"
        onRequest={mockOnRequest}
        testID="test-card"
      />,
    );
    expect(screen.getByTestId('test-card-request-button')).toBeTruthy();
    expect(screen.getByText('권한 요청')).toBeTruthy();
  });

  it('shows settings button when denied', () => {
    renderWithTheme(
      <PermissionCard
        title="위치 권한"
        description="Test"
        icon="📍"
        status="denied"
        onRequest={mockOnRequest}
        testID="test-card"
      />,
    );
    expect(screen.getByTestId('test-card-request-button')).toBeTruthy();
    expect(screen.getByText('설정으로 이동')).toBeTruthy();
  });

  it('does not show request button when granted', () => {
    renderWithTheme(
      <PermissionCard
        title="위치 권한"
        description="Test"
        icon="📍"
        status="granted"
        onRequest={mockOnRequest}
        testID="test-card"
      />,
    );
    expect(screen.queryByTestId('test-card-request-button')).toBeFalsy();
  });

  it('calls onRequest when request button is pressed', () => {
    renderWithTheme(
      <PermissionCard
        title="위치 권한"
        description="Test"
        icon="📍"
        status="not-requested"
        onRequest={mockOnRequest}
        testID="test-card"
      />,
    );
    const requestButton = screen.getByTestId('test-card-request-button');
    fireEvent.press(requestButton);
    expect(mockOnRequest).toHaveBeenCalledTimes(1);
  });

  it('displays status badge with correct testID', () => {
    renderWithTheme(
      <PermissionCard
        title="위치 권한"
        description="Test"
        icon="📍"
        status="granted"
        onRequest={mockOnRequest}
        testID="test-card"
      />,
    );
    expect(screen.getByTestId('test-card-status-badge')).toBeTruthy();
  });
});
