/**
 * Text Component
 * Themed text component with typography variants
 */

import React from 'react';
import {Text as RNText, StyleSheet, TextStyle} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

export interface TextProps {
  /** Text content */
  children: React.ReactNode;
  /** Typography variant */
  variant?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | 'caption'
    | 'body'
    | 'h3'
    | 'h2'
    | 'h1';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Text color */
  color?: 'primary' | 'secondary';
  /** Custom style */
  style?: TextStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Text Component
 *
 * A themed text component with typography scale variants
 * and color options.
 *
 * @example
 * ```tsx
 * <Text>Regular text</Text>
 * <Text variant="lg" weight="bold">Large bold text</Text>
 * <Text color="secondary">Secondary color text</Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
  children,
  variant = 'base',
  weight = 'normal',
  color = 'primary',
  style,
  testID,
}) => {
  const {theme} = useTheme();

  const variantStyles: Record<string, TextStyle> = {
    xs: {fontSize: theme.typography.fontSize.xs},
    sm: {fontSize: theme.typography.fontSize.sm},
    base: {fontSize: theme.typography.fontSize.base},
    lg: {fontSize: theme.typography.fontSize.lg},
    xl: {fontSize: theme.typography.fontSize.xl},
    '2xl': {fontSize: theme.typography.fontSize['2xl']},
    '3xl': {fontSize: theme.typography.fontSize['3xl']},
    // Semantic variants (mapped to size variants)
    caption: {fontSize: theme.typography.fontSize.xs},
    body: {fontSize: theme.typography.fontSize.base},
    h3: {fontSize: theme.typography.fontSize.lg},
    h2: {fontSize: theme.typography.fontSize.xl},
    h1: {fontSize: theme.typography.fontSize['2xl']},
  };

  const weightStyles: Record<string, TextStyle> = {
    normal: {fontWeight: theme.typography.fontWeight.normal},
    medium: {fontWeight: theme.typography.fontWeight.medium},
    semibold: {fontWeight: theme.typography.fontWeight.semibold},
    bold: {fontWeight: theme.typography.fontWeight.bold},
  };

  const colorStyles: Record<string, TextStyle> = {
    primary: {color: theme.colors.text},
    secondary: {color: theme.colors.textSecondary},
  };

  return (
    <RNText
      style={[
        styles.text,
        {fontFamily: theme.typography.fontFamily.base},
        variantStyles[variant],
        weightStyles[weight],
        colorStyles[color],
        style,
      ]}
      testID={testID}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    lineHeight: 1.5 * 16, // base line-height * base font-size
  },
});
