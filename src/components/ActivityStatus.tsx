/**
 * ActivityStatus Component
 * Displays current activity status with visual indicator
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from './Text';
import {Badge} from './Badge';
import {useTheme} from '../theme/ThemeContext';
import type {ActivityType} from '../types/AppState';

interface ActivityStatusProps {
  activity: ActivityType;
  isDetecting: boolean;
}

/**
 * Get activity display information
 */
const getActivityInfo = (activity: ActivityType, isDetecting: boolean) => {
  if (!isDetecting) {
    return {
      text: '대기 중',
      variant: 'inactive' as const,
    };
  }

  switch (activity) {
    case 'walking':
      return {
        text: '걷기 감지됨',
        variant: 'success' as const,
      };
    case 'running':
      return {
        text: '뛰기 감지됨',
        variant: 'warning' as const,
      };
    default:
      return {
        text: '활동 감지 중...',
        variant: 'inactive' as const,
      };
  }
};

export const ActivityStatus: React.FC<ActivityStatusProps> = ({
  activity,
  isDetecting,
}) => {
  const {theme} = useTheme();
  const activityInfo = getActivityInfo(activity, isDetecting);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.surface}]}
      testID="activity-status">
      <Text variant="h2" style={styles.title}>
        현재 활동
      </Text>
      <View style={styles.statusContainer}>
        <Badge
          text={activityInfo.text}
          variant={activityInfo.variant}
          testID="activity-badge"
        />
      </View>
      {isDetecting && (
        <Text variant="caption" style={styles.hint}>
          모션 감지가 활성화되어 있습니다
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  statusContainer: {
    marginVertical: 8,
  },
  hint: {
    marginTop: 12,
    opacity: 0.7,
  },
});
