/**
 * Button Component
 * Themed button with multiple variants
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

export interface ButtonProps {
  /** Button text */
  title: string;
  /** Press handler */
  onPress?: () => void;
  /** Visual variant */
  variant?: 'primary' | 'success' | 'danger' | 'outline';
  /** Disabled state */
  disabled?: boolean;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Button Component
 *
 * A versatile button component with multiple visual variants
 * and theme integration.
 *
 * @example
 * ```tsx
 * <Button title="Submit" variant="primary" onPress={() => {}} />
 * <Button title="Delete" variant="danger" />
 * <Button title="Cancel" variant="outline" />
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  testID,
}) => {
  const {theme} = useTheme();

  const variantStyles: Record<string, ViewStyle> = {
    primary: {
      backgroundColor: theme.colors.primary,
    },
    success: {
      backgroundColor: theme.colors.success,
    },
    danger: {
      backgroundColor: theme.colors.danger,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
  };

  const variantTextStyles: Record<string, TextStyle> = {
    primary: {
      color: '#ffffff',
    },
    success: {
      color: '#ffffff',
    },
    danger: {
      color: '#ffffff',
    },
    outline: {
      color: theme.colors.primary,
    },
  };

  const disabledStyle: ViewStyle = disabled
    ? {
        backgroundColor: theme.colors.neutral400,
        borderColor: theme.colors.neutral400,
      }
    : {};

  const disabledTextStyle: TextStyle = disabled
    ? {
        color: theme.colors.neutral600,
      }
    : {};

  return (
    <TouchableOpacity
      style={[styles.button, variantStyles[variant], disabledStyle]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{disabled}}>
      <Text
        style={[
          styles.text,
          {fontFamily: theme.typography.fontFamily.base},
          variantTextStyles[variant],
          disabledTextStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
