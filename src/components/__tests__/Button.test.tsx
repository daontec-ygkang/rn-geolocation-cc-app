import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from '../Button';
import {ThemeProvider} from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Button Component', () => {
  it('should render correctly', () => {
    const {getByText} = renderWithTheme(<Button title="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const {getByText} = renderWithTheme(
      <Button title="Test" onPress={onPress} />,
    );
    fireEvent.press(getByText('Test'));
    expect(onPress).toHaveBeenCalled();
  });

  it('should apply primary variant styles', () => {
    const {getByTestId} = renderWithTheme(
      <Button title="Test" variant="primary" testID="button" />,
    );
    const button = getByTestId('button');
    expect(button).toBeTruthy();
  });

  it('should apply success variant styles', () => {
    const {getByTestId} = renderWithTheme(
      <Button title="Test" variant="success" testID="button" />,
    );
    const button = getByTestId('button');
    expect(button).toBeTruthy();
  });

  it('should apply danger variant styles', () => {
    const {getByTestId} = renderWithTheme(
      <Button title="Test" variant="danger" testID="button" />,
    );
    const button = getByTestId('button');
    expect(button).toBeTruthy();
  });

  it('should apply outline variant styles', () => {
    const {getByTestId} = renderWithTheme(
      <Button title="Test" variant="outline" testID="button" />,
    );
    const button = getByTestId('button');
    expect(button).toBeTruthy();
  });

  it('should be disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const {getByTestId} = renderWithTheme(
      <Button title="Test" disabled onPress={onPress} testID="button" />,
    );
    const button = getByTestId('button');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should have accessibility label', () => {
    const {getByTestId} = renderWithTheme(
      <Button title="Test" testID="button" />,
    );
    const button = getByTestId('button');
    expect(button.props.accessibilityLabel).toBe('Test');
  });
});
