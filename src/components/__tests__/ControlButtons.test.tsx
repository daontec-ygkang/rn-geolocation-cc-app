/**
 * ControlButtons Component Tests
 */

import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {ControlButtons} from '../ControlButtons';
import {ThemeProvider} from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ControlButtons', () => {
  const mockOnStart = jest.fn();
  const mockOnStop = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithTheme(
      <ControlButtons
        isDetecting={false}
        onStart={mockOnStart}
        onStop={mockOnStop}
      />,
    );
    expect(screen.getByTestId('control-buttons')).toBeTruthy();
  });

  it('shows start button when not detecting', () => {
    renderWithTheme(
      <ControlButtons
        isDetecting={false}
        onStart={mockOnStart}
        onStop={mockOnStop}
      />,
    );
    expect(screen.getByTestId('start-button')).toBeTruthy();
    expect(screen.getByText('감지 시작')).toBeTruthy();
  });

  it('shows stop button when detecting', () => {
    renderWithTheme(
      <ControlButtons
        isDetecting={true}
        onStart={mockOnStart}
        onStop={mockOnStop}
      />,
    );
    expect(screen.getByTestId('stop-button')).toBeTruthy();
    expect(screen.getByText('감지 중지')).toBeTruthy();
  });

  it('calls onStart when start button is pressed', () => {
    renderWithTheme(
      <ControlButtons
        isDetecting={false}
        onStart={mockOnStart}
        onStop={mockOnStop}
      />,
    );
    const startButton = screen.getByTestId('start-button');
    fireEvent.press(startButton);
    expect(mockOnStart).toHaveBeenCalledTimes(1);
    expect(mockOnStop).not.toHaveBeenCalled();
  });

  it('calls onStop when stop button is pressed', () => {
    renderWithTheme(
      <ControlButtons
        isDetecting={true}
        onStart={mockOnStart}
        onStop={mockOnStop}
      />,
    );
    const stopButton = screen.getByTestId('stop-button');
    fireEvent.press(stopButton);
    expect(mockOnStop).toHaveBeenCalledTimes(1);
    expect(mockOnStart).not.toHaveBeenCalled();
  });

  it('disables start button when disabled prop is true', () => {
    renderWithTheme(
      <ControlButtons
        isDetecting={false}
        onStart={mockOnStart}
        onStop={mockOnStop}
        disabled={true}
      />,
    );
    const startButton = screen.getByTestId('start-button');
    expect(startButton.props.accessibilityState.disabled).toBe(true);
  });

  it('disables stop button when disabled prop is true', () => {
    renderWithTheme(
      <ControlButtons
        isDetecting={true}
        onStart={mockOnStart}
        onStop={mockOnStop}
        disabled={true}
      />,
    );
    const stopButton = screen.getByTestId('stop-button');
    expect(stopButton.props.accessibilityState.disabled).toBe(true);
  });

  it('does not call callbacks when disabled', () => {
    renderWithTheme(
      <ControlButtons
        isDetecting={false}
        onStart={mockOnStart}
        onStop={mockOnStop}
        disabled={true}
      />,
    );
    const startButton = screen.getByTestId('start-button');
    fireEvent.press(startButton);
    expect(mockOnStart).not.toHaveBeenCalled();
  });
});
