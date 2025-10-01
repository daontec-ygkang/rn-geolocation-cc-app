/**
 * Spinner Component
 * Loading indicator with size and color options
 */

import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

export interface SpinnerProps {
  /** Spinner size */
  size?: 'small' | 'large';
  /** Spinner color (defaults to theme primary) */
  color?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Spinner Component
 *
 * A loading indicator component with customizable size and color.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="large" />
 * <Spinner color="#ff0000" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'small',
  color,
  testID,
}) => {
  const {theme} = useTheme();
  const spinnerColor = color || theme.colors.primary;

  return (
    <View style={styles.container} testID={testID}>
      <ActivityIndicator size={size} color={spinnerColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
