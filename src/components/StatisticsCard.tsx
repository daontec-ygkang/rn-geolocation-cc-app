/**
 * StatisticsCard Component
 * Displays activity time statistics
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card} from './Card';
import {Text} from './Text';
import type {StatisticsState} from '../types/AppState';

interface StatisticsCardProps {
  statistics: StatisticsState;
}

/**
 * Format milliseconds to human-readable time
 * @param ms - Time in milliseconds
 * @returns Formatted time string (e.g., "1시간 23분")
 */
const formatTime = (ms: number): string => {
  if (ms === 0) {
    return '0분';
  }

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${remainingMinutes}분`;
  }

  return `${remainingMinutes}분`;
};

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  statistics,
}) => {
  return (
    <Card style={styles.card} testID="statistics-card">
      <Text variant="h3" style={styles.title}>
        활동 통계
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem} testID="total-time-stat">
          <Text variant="caption" style={styles.statLabel}>
            총 시간
          </Text>
          <Text variant="h2" weight="bold" testID="total-time-value">
            {formatTime(statistics.totalTime)}
          </Text>
        </View>

        <View style={styles.statItem} testID="walking-time-stat">
          <Text variant="caption" style={styles.statLabel}>
            걷기
          </Text>
          <Text variant="h3" weight="semibold" testID="walking-time-value">
            {formatTime(statistics.walkingTime)}
          </Text>
        </View>

        <View style={styles.statItem} testID="running-time-stat">
          <Text variant="caption" style={styles.statLabel}>
            뛰기
          </Text>
          <Text variant="h3" weight="semibold" testID="running-time-value">
            {formatTime(statistics.runningTime)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    marginBottom: 8,
    opacity: 0.7,
  },
});
