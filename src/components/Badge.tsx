/**
 * Badge Component
 * Small status indicator with color variants
 */

import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

export interface BadgeProps {
  /** Badge text */
  text: string;
  /** Visual variant */
  variant?: 'success' | 'danger' | 'warning' | 'inactive';
  /** Test ID for testing */
  testID?: string;
}

/**
 * Badge Component
 *
 * A small status indicator component with color variants
 * for displaying status, labels, or counts.
 *
 * @example
 * ```tsx
 * <Badge text="New" variant="success" />
 * <Badge text="Error" variant="danger" />
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'inactive',
  testID,
}) => {
  const {theme} = useTheme();

  const variantStyles: Record<string, ViewStyle> = {
    success: {
      backgroundColor: theme.colors.success,
    },
    danger: {
      backgroundColor: theme.colors.danger,
    },
    warning: {
      backgroundColor: theme.colors.warning,
    },
    inactive: {
      backgroundColor: theme.colors.neutral400,
    },
  };

  return (
    <View
      style={[styles.badge, variantStyles[variant]]}
      testID={testID}
      accessibilityLabel={text}
      accessibilityRole="text">
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
