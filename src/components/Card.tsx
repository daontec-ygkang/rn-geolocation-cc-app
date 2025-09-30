/**
 * Card Component
 * Container component with elevation and padding
 */

import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Custom style */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Card Component
 *
 * A container component with theme-aware styling,
 * elevation, and consistent padding.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Text>Card Content</Text>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({children, style, testID}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          ...theme.shadows.md,
        },
        style,
      ]}
      testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
});
