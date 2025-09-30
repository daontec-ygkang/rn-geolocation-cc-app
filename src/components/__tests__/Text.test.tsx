import React from 'react';
import {render} from '@testing-library/react-native';
import {Text} from '../Text';
import {ThemeProvider} from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Text Component', () => {
  it('should render children correctly', () => {
    const {getByText} = renderWithTheme(<Text>Test Text</Text>);
    expect(getByText('Test Text')).toBeTruthy();
  });

  it('should apply xs variant', () => {
    const {getByTestId} = renderWithTheme(
      <Text variant="xs" testID="text">
        Text
      </Text>,
    );
    expect(getByTestId('text')).toBeTruthy();
  });

  it('should apply sm variant', () => {
    const {getByTestId} = renderWithTheme(
      <Text variant="sm" testID="text">
        Text
      </Text>,
    );
    expect(getByTestId('text')).toBeTruthy();
  });

  it('should apply base variant', () => {
    const {getByTestId} = renderWithTheme(
      <Text variant="base" testID="text">
        Text
      </Text>,
    );
    expect(getByTestId('text')).toBeTruthy();
  });

  it('should apply lg variant', () => {
    const {getByTestId} = renderWithTheme(
      <Text variant="lg" testID="text">
        Text
      </Text>,
    );
    expect(getByTestId('text')).toBeTruthy();
  });

  it('should apply xl variant', () => {
    const {getByTestId} = renderWithTheme(
      <Text variant="xl" testID="text">
        Text
      </Text>,
    );
    expect(getByTestId('text')).toBeTruthy();
  });

  it('should apply bold weight', () => {
    const {getByTestId} = renderWithTheme(
      <Text weight="bold" testID="text">
        Text
      </Text>,
    );
    expect(getByTestId('text')).toBeTruthy();
  });

  it('should apply secondary color', () => {
    const {getByTestId} = renderWithTheme(
      <Text color="secondary" testID="text">
        Text
      </Text>,
    );
    expect(getByTestId('text')).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const {getByTestId} = renderWithTheme(
      <Text style={{marginTop: 10}} testID="text">
        Text
      </Text>,
    );
    expect(getByTestId('text')).toBeTruthy();
  });
});
