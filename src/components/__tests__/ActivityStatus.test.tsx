/**
 * ActivityStatus Component Tests
 */

import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {ActivityStatus} from '../ActivityStatus';
import {ThemeProvider} from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ActivityStatus', () => {
  it('renders correctly', () => {
    renderWithTheme(
      <ActivityStatus activity="inactive" isDetecting={false} />,
    );
    expect(screen.getByTestId('activity-status')).toBeTruthy();
  });

  it('displays "대기 중" when not detecting', () => {
    renderWithTheme(
      <ActivityStatus activity="inactive" isDetecting={false} />,
    );
    expect(screen.getByText('대기 중')).toBeTruthy();
    expect(screen.getByTestId('activity-badge')).toBeTruthy();
  });

  it('displays "걷기 감지됨" when detecting walking', () => {
    renderWithTheme(<ActivityStatus activity="walking" isDetecting={true} />);
    expect(screen.getByText('걷기 감지됨')).toBeTruthy();
  });

  it('displays "뛰기 감지됨" when detecting running', () => {
    renderWithTheme(<ActivityStatus activity="running" isDetecting={true} />);
    expect(screen.getByText('뛰기 감지됨')).toBeTruthy();
  });

  it('displays "활동 감지 중..." when detecting but inactive', () => {
    renderWithTheme(<ActivityStatus activity="inactive" isDetecting={true} />);
    expect(screen.getByText('활동 감지 중...')).toBeTruthy();
  });

  it('shows hint text when detecting is active', () => {
    renderWithTheme(<ActivityStatus activity="walking" isDetecting={true} />);
    expect(screen.getByText('모션 감지가 활성화되어 있습니다')).toBeTruthy();
  });

  it('does not show hint text when detecting is inactive', () => {
    renderWithTheme(
      <ActivityStatus activity="inactive" isDetecting={false} />,
    );
    expect(
      screen.queryByText('모션 감지가 활성화되어 있습니다'),
    ).toBeFalsy();
  });

  it('uses correct badge variant for walking', () => {
    renderWithTheme(<ActivityStatus activity="walking" isDetecting={true} />);
    const badge = screen.getByTestId('activity-badge');
    expect(badge).toBeTruthy();
  });

  it('uses correct badge variant for running', () => {
    renderWithTheme(<ActivityStatus activity="running" isDetecting={true} />);
    const badge = screen.getByTestId('activity-badge');
    expect(badge).toBeTruthy();
  });

  it('uses inactive badge variant when not detecting', () => {
    renderWithTheme(
      <ActivityStatus activity="inactive" isDetecting={false} />,
    );
    const badge = screen.getByTestId('activity-badge');
    expect(badge).toBeTruthy();
  });
});
