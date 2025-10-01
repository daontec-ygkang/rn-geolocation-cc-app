/**
 * Dashboard Screen
 * Main screen for activity detection control and status display
 */

import React, {useCallback} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {useApp} from '../contexts/AppContext';
import {
  ActivityStatus,
  ControlButtons,
  StatisticsCard,
  Card,
  Text,
} from '../components';
import type {DashboardScreenNavigationProp} from '../navigation/types';

interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  const {theme} = useTheme();
  const {state, updateState} = useApp();

  /**
   * Handle start detection button press
   */
  const handleStart = useCallback(() => {
    // Check permissions
    if (!state.permissions.location || !state.permissions.activity) {
      Alert.alert(
        '권한 필요',
        '위치 및 활동 인식 권한이 필요합니다. 설정 화면에서 권한을 허용해주세요.',
        [
          {text: '취소', style: 'cancel'},
          {
            text: '설정으로 이동',
            onPress: () => {
              // TODO: Navigate to Permissions screen in Phase 2.2
              console.log('Navigate to Permissions screen');
            },
          },
        ],
      );
      return;
    }

    // Start detection
    updateState('isDetecting', true);
    // TODO: Initialize geolocation tracking in Phase 2.2
  }, [state.permissions, updateState]);

  /**
   * Handle stop detection button press
   */
  const handleStop = useCallback(() => {
    updateState('isDetecting', false);
    updateState('currentActivity', 'inactive');
    // TODO: Stop geolocation tracking in Phase 2.2
  }, [updateState]);

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      testID="dashboard-screen">
      <View style={styles.content}>
        {/* Activity Status Section */}
        <ActivityStatus
          activity={state.currentActivity}
          isDetecting={state.isDetecting}
        />

        {/* Control Buttons */}
        <ControlButtons
          isDetecting={state.isDetecting}
          onStart={handleStart}
          onStop={handleStop}
        />

        {/* Statistics Section */}
        <StatisticsCard statistics={state.statistics} />

        {/* Information Card */}
        <Card style={styles.infoCard}>
          <Text variant="body" weight="semibold" style={styles.infoTitle}>
            💡 사용 안내
          </Text>
          <Text variant="caption" style={styles.infoText}>
            • 감지 시작 버튼을 눌러 활동 감지를 시작하세요
          </Text>
          <Text variant="caption" style={styles.infoText}>
            • 걷기와 뛰기 활동이 자동으로 감지됩니다
          </Text>
          <Text variant="caption" style={styles.infoText}>
            • 통계는 자동으로 저장되며 로그 화면에서 확인할 수 있습니다
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
  },
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoTitle: {
    marginBottom: 12,
  },
  infoText: {
    marginBottom: 6,
    lineHeight: 20,
  },
});
