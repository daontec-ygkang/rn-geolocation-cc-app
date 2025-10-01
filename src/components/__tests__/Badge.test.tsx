import React from 'react';
import {render} from '@testing-library/react-native';
import {Badge} from '../Badge';
import {ThemeProvider} from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Badge Component', () => {
  it('should render text correctly', () => {
    const {getByText} = renderWithTheme(<Badge text="New" />);
    expect(getByText('New')).toBeTruthy();
  });

  it('should apply success variant', () => {
    const {getByTestId} = renderWithTheme(
      <Badge text="Success" variant="success" testID="badge" />,
    );
    expect(getByTestId('badge')).toBeTruthy();
  });

  it('should apply danger variant', () => {
    const {getByTestId} = renderWithTheme(
      <Badge text="Error" variant="danger" testID="badge" />,
    );
    expect(getByTestId('badge')).toBeTruthy();
  });

  it('should apply warning variant', () => {
    const {getByTestId} = renderWithTheme(
      <Badge text="Warning" variant="warning" testID="badge" />,
    );
    expect(getByTestId('badge')).toBeTruthy();
  });

  it('should apply inactive variant', () => {
    const {getByTestId} = renderWithTheme(
      <Badge text="Inactive" variant="inactive" testID="badge" />,
    );
    expect(getByTestId('badge')).toBeTruthy();
  });
});
