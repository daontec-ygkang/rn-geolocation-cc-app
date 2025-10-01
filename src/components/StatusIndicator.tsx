/**
 * StatusIndicator Component
 * Large animated status indicator matching prototype design
 */

import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {Text} from './Text';

export type StatusVariant = 'walking' | 'running' | 'inactive';

export interface StatusIndicatorProps {
  icon: string;
  statusText: string;
  statusSubtext: string;
  variant: StatusVariant;
  testID?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  icon,
  statusText,
  statusSubtext,
  variant,
  testID,
}) => {
  const {theme} = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for active states
  useEffect(() => {
    if (variant === 'walking' || variant === 'running') {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      );
      animation.start();
      return () => animation.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [variant, pulseAnim]);

  const getBackgroundColor = (): string => {
    switch (variant) {
      case 'walking':
        return theme.colors.success;
      case 'running':
        return theme.colors.warning;
      case 'inactive':
        return theme.colors.border;
    }
  };

  const getIconColor = (): string => {
    return variant === 'inactive' ? theme.colors.textSecondary : '#FFFFFF';
  };

  return (
    <View style={styles.container} testID={testID}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            backgroundColor: getBackgroundColor(),
            transform: [{scale: pulseAnim}],
          },
        ]}
        testID={`${testID}-icon-container`}>
        <Text
          style={[styles.icon, {color: getIconColor()}]}
          testID={`${testID}-icon`}>
          {icon}
        </Text>
      </Animated.View>

      <Text
        variant="h2"
        weight="bold"
        style={[styles.statusText, {color: theme.colors.text}]}
        testID={`${testID}-status-text`}>
        {statusText}
      </Text>

      <Text
        variant="body"
        style={[styles.statusSubtext, {color: theme.colors.textSecondary}]}
        testID={`${testID}-status-subtext`}>
        {statusSubtext}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
  },
  statusText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  statusSubtext: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
