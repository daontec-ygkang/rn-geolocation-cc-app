/**
 * StatisticsCard Component Tests
 */

import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {StatisticsCard} from '../StatisticsCard';
import {ThemeProvider} from '../../theme/ThemeContext';
import type {StatisticsState} from '../../types/AppState';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('StatisticsCard', () => {
  const mockStatistics: StatisticsState = {
    totalTime: 0,
    walkingTime: 0,
    runningTime: 0,
  };

  it('renders correctly', () => {
    renderWithTheme(<StatisticsCard statistics={mockStatistics} />);
    expect(screen.getByTestId('statistics-card')).toBeTruthy();
  });

  it('displays all statistic items', () => {
    renderWithTheme(<StatisticsCard statistics={mockStatistics} />);
    expect(screen.getByTestId('total-time-stat')).toBeTruthy();
    expect(screen.getByTestId('walking-time-stat')).toBeTruthy();
    expect(screen.getByTestId('running-time-stat')).toBeTruthy();
  });

  it('displays zero values correctly', () => {
    renderWithTheme(<StatisticsCard statistics={mockStatistics} />);
    const zeroValues = screen.getAllByText('0분');
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  it('formats minutes correctly', () => {
    const statistics: StatisticsState = {
      totalTime: 5 * 60 * 1000, // 5 minutes
      walkingTime: 3 * 60 * 1000, // 3 minutes
      runningTime: 2 * 60 * 1000, // 2 minutes
    };
    renderWithTheme(<StatisticsCard statistics={statistics} />);
    expect(screen.getByText('5분')).toBeTruthy();
    expect(screen.getByText('3분')).toBeTruthy();
    expect(screen.getByText('2분')).toBeTruthy();
  });

  it('formats hours and minutes correctly', () => {
    const statistics: StatisticsState = {
      totalTime: 90 * 60 * 1000, // 1 hour 30 minutes
      walkingTime: 45 * 60 * 1000, // 45 minutes
      runningTime: 125 * 60 * 1000, // 2 hours 5 minutes
    };
    renderWithTheme(<StatisticsCard statistics={statistics} />);
    expect(screen.getByText('1시간 30분')).toBeTruthy();
    expect(screen.getByText('45분')).toBeTruthy();
    expect(screen.getByText('2시간 5분')).toBeTruthy();
  });

  it('handles exact hours correctly', () => {
    const statistics: StatisticsState = {
      totalTime: 120 * 60 * 1000, // 2 hours exactly
      walkingTime: 60 * 60 * 1000, // 1 hour exactly
      runningTime: 0,
    };
    renderWithTheme(<StatisticsCard statistics={statistics} />);
    expect(screen.getByText('2시간 0분')).toBeTruthy();
    expect(screen.getByText('1시간 0분')).toBeTruthy();
  });

  it('displays labels correctly', () => {
    renderWithTheme(<StatisticsCard statistics={mockStatistics} />);
    expect(screen.getByText('활동 통계')).toBeTruthy();
    expect(screen.getByText('총 시간')).toBeTruthy();
    expect(screen.getByText('걷기')).toBeTruthy();
    expect(screen.getByText('뛰기')).toBeTruthy();
  });

  it('handles large time values', () => {
    const statistics: StatisticsState = {
      totalTime: 600 * 60 * 1000, // 10 hours
      walkingTime: 300 * 60 * 1000, // 5 hours
      runningTime: 300 * 60 * 1000, // 5 hours
    };
    renderWithTheme(<StatisticsCard statistics={statistics} />);
    expect(screen.getByText('10시간 0분')).toBeTruthy();
    const fiveHours = screen.getAllByText('5시간 0분');
    expect(fiveHours.length).toBe(2); // walking and running both show 5 hours
  });

  it('handles partial minutes', () => {
    const statistics: StatisticsState = {
      totalTime: 150 * 1000, // 2.5 minutes (should round down to 2)
      walkingTime: 90 * 1000, // 1.5 minutes (should round down to 1)
      runningTime: 30 * 1000, // 0.5 minutes (should round down to 0)
    };
    renderWithTheme(<StatisticsCard statistics={statistics} />);
    expect(screen.getByText('2분')).toBeTruthy();
    expect(screen.getByText('1분')).toBeTruthy();
  });
});
