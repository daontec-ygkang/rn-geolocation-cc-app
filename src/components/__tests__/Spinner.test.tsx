import React from 'react';
import {render} from '@testing-library/react-native';
import {Spinner} from '../Spinner';
import {ThemeProvider} from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Spinner Component', () => {
  it('should render correctly', () => {
    const {getByTestId} = renderWithTheme(<Spinner testID="spinner" />);
    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should apply small size', () => {
    const {getByTestId} = renderWithTheme(
      <Spinner size="small" testID="spinner" />,
    );
    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should apply large size', () => {
    const {getByTestId} = renderWithTheme(
      <Spinner size="large" testID="spinner" />,
    );
    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should apply custom color', () => {
    const {getByTestId} = renderWithTheme(
      <Spinner color="#ff0000" testID="spinner" />,
    );
    expect(getByTestId('spinner')).toBeTruthy();
  });
});
