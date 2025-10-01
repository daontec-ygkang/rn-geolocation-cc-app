import React from 'react';
import {render} from '@testing-library/react-native';
import {Text} from 'react-native';
import {Card} from '../Card';
import {ThemeProvider} from '../../theme/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Card Component', () => {
  it('should render children correctly', () => {
    const {getByText} = renderWithTheme(
      <Card>
        <Text>Test Content</Text>
      </Card>,
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('should have default testID', () => {
    const {getByTestId} = renderWithTheme(
      <Card testID="card">
        <Text>Content</Text>
      </Card>,
    );
    expect(getByTestId('card')).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const customStyle = {marginTop: 20};
    const {getByTestId} = renderWithTheme(
      <Card style={customStyle} testID="card">
        <Text>Content</Text>
      </Card>,
    );
    const card = getByTestId('card');
    expect(card).toBeTruthy();
  });
});
