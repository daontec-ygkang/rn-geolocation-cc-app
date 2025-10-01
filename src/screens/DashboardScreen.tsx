/**
 * Dashboard Screen
 * Tab-based test dashboard matching prototype design
 * Integrated with GeolocationService for real motion detection
 */

import React, {useCallback, useEffect, useState, useRef} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {useApp} from '../contexts/AppContext';
import {StatusIndicator, TabBar, Card, Text, Button, Badge} from '../components';
import GeolocationService from '../services/GeolocationService';
import type {StatusVariant} from '../components/StatusIndicator';
import type {DashboardScreenNavigationProp} from '../navigation/types';
import type {DetectionMode, ActivityType} from '../types/AppState';

interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

const TABS = [
  {id: 'vehicle-exit' as DetectionMode, label: '차량 하차 감지'},
  {id: 'motion' as DetectionMode, label: '걷기/뛰기 감지'},
  {id: 'integrated' as DetectionMode, label: '통합 시나리오'},
];

export const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  const {theme} = useTheme();
  const {state, updateState, addLog} = useApp();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const activityStartTime = useRef<number | null>(null);

  // Initialize GeolocationService on mount
  useEffect(() => {
    let mounted = true;

    const initializeService = async () => {
      try {
        await GeolocationService.init();
        if (mounted) {
          setIsInitialized(true);
          console.log('[DashboardScreen] GeolocationService initialized');
        }
      } catch (error) {
        console.error('[DashboardScreen] Initialization failed:', error);
        if (mounted) {
          Alert.alert(
            '초기화 실패',
            '모션 감지 서비스를 초기화하지 못했습니다.',
          );
        }
      }
    };

    initializeService();

    // Cleanup on unmount
    return () => {
      mounted = false;
      if (GeolocationService.isTracking()) {
        GeolocationService.stop().catch(console.error);
      }
    };
  }, []);

  const handleTabChange = useCallback(
    (tabId: DetectionMode) => {
      // Stop detection when changing tabs
      if (state.isDetecting) {
        GeolocationService.stop()
          .then(() => {
            updateState('isDetecting', false);
            updateState('currentActivity', 'inactive');
            updateState('vehicleState', null);
            updateState('detectionMode', tabId);
          })
          .catch(error => {
            console.error('[DashboardScreen] Stop failed on tab change:', error);
          });
      } else {
        updateState('detectionMode', tabId);
      }
    },
    [state.isDetecting, updateState],
  );

  // Activity callback for GeolocationService
  const handleActivityChange = useCallback(
    (activity: ActivityType) => {
      console.log('[DashboardScreen] Activity detected:', activity);

      // Update current activity
      const previousActivity = state.currentActivity;
      updateState('currentActivity', activity);

      // Handle activity changes with logging
      if (activity !== 'inactive' && activity !== previousActivity) {
        // Record start time for new activity
        activityStartTime.current = Date.now();
      } else if (activity === 'inactive' && activityStartTime.current) {
        // Calculate duration when activity ends
        const duration = Math.floor((Date.now() - activityStartTime.current) / 1000);

        // Add log entry and update statistics
        if (previousActivity === 'walking' || previousActivity === 'running') {
          addLog(previousActivity, duration);
          console.log(
            `[DashboardScreen] Log added: ${previousActivity} for ${duration}s`,
          );
        }

        activityStartTime.current = null;
      }
    },
    [state.currentActivity, updateState, addLog],
  );

  const handleStartStop = useCallback(async () => {
    if (!isInitialized) {
      Alert.alert('서비스 미준비', '모션 감지 서비스가 아직 준비되지 않았습니다.');
      return;
    }

    setIsLoading(true);

    try {
      if (state.isDetecting) {
        // Stop detection
        await GeolocationService.stop();

        // Save final activity duration and log
        if (activityStartTime.current) {
          const duration = Math.floor(
            (Date.now() - activityStartTime.current) / 1000,
          );
          const currentActivity = state.currentActivity;

          if (currentActivity === 'walking' || currentActivity === 'running') {
            addLog(currentActivity, duration);
            console.log(
              `[DashboardScreen] Final log added: ${currentActivity} for ${duration}s`,
            );
          }

          activityStartTime.current = null;
        }

        updateState('isDetecting', false);
        updateState('currentActivity', 'inactive');
        updateState('vehicleState', null);
        console.log('[DashboardScreen] Detection stopped');
      } else {
        // Start detection
        await GeolocationService.start(handleActivityChange);
        updateState('isDetecting', true);
        console.log('[DashboardScreen] Detection started');
      }
    } catch (error) {
      console.error('[DashboardScreen] Start/Stop error:', error);
      Alert.alert(
        '오류',
        `모션 감지를 ${state.isDetecting ? '중지' : '시작'}하지 못했습니다.`,
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    isInitialized,
    state.isDetecting,
    state.currentActivity,
    updateState,
    addLog,
    handleActivityChange,
  ]);

  // Render Vehicle Exit Tab
  const renderVehicleExitTab = () => {
    const getVehicleStatus = () => {
      if (!state.isDetecting) {
        return {
          icon: '🚗',
          text: '차량 상태 모니터링 대기 중',
          subtext: '시작 버튼을 눌러 차량 하차 감지를 시작하세요',
          variant: 'inactive' as StatusVariant,
        };
      }

      switch (state.vehicleState) {
        case 'driving':
          return {
            icon: '🚗',
            text: '운전 중 감지됨',
            subtext: '차량이 이동 중입니다',
            variant: 'walking' as StatusVariant,
          };
        case 'parked':
          return {
            icon: '🅿️',
            text: '주차됨',
            subtext: '차량이 정지했습니다',
            variant: 'running' as StatusVariant,
          };
        case 'exited':
          return {
            icon: '🚶',
            text: '하차 감지됨',
            subtext: '차량에서 하차했습니다',
            variant: 'walking' as StatusVariant,
          };
        default:
          return {
            icon: '👁️',
            text: '차량 감지 중...',
            subtext: '차량 상태를 모니터링하고 있습니다',
            variant: 'inactive' as StatusVariant,
          };
      }
    };

    const status = getVehicleStatus();
    const badgeText = state.isDetecting ? '감지 중' : '대기 중';
    const badgeVariant = state.isDetecting ? 'success' : 'neutral';

    return (
      <View>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="h3" weight="bold">
              차량 하차 감지 테스트
            </Text>
            <Badge text={badgeText} variant={badgeVariant} testID="vehicle-badge" />
          </View>

          <StatusIndicator
            icon={status.icon}
            statusText={status.text}
            statusSubtext={status.subtext}
            variant={status.variant}
            testID="vehicle-status"
          />

          <Button
            title={state.isDetecting ? '차량 감지 중지' : '차량 감지 시작'}
            variant={state.isDetecting ? 'danger' : 'primary'}
            onPress={handleStartStop}
            disabled={!isInitialized || isLoading}
            testID="vehicle-button"
            style={styles.button}
          />
        </Card>

        <Card style={styles.infoCard}>
          <Text variant="body" weight="semibold">
            💡 테스트 목적:
          </Text>
          <Text variant="caption" style={styles.infoText}>
            운전 완료 → 주차 → 하차 시나리오를 감지합니다.
          </Text>
        </Card>
      </View>
    );
  };

  // Render Motion Tab
  const renderMotionTab = () => {
    const getMotionStatus = () => {
      if (!state.isDetecting) {
        return {
          icon: '⏸️',
          text: '모션 감지 대기 중',
          subtext: '시작 버튼을 눌러 걷기/뛰기 감지를 시작하세요',
          variant: 'inactive' as StatusVariant,
        };
      }

      switch (state.currentActivity) {
        case 'walking':
          return {
            icon: '🚶',
            text: '걷기 감지됨',
            subtext: '현재 걷기 활동이 감지되고 있습니다',
            variant: 'walking' as StatusVariant,
          };
        case 'running':
          return {
            icon: '🏃',
            text: '뛰기 감지됨',
            subtext: '현재 뛰기 활동이 감지되고 있습니다',
            variant: 'running' as StatusVariant,
          };
        default:
          return {
            icon: '👁️',
            text: '활동 감지 중...',
            subtext: '움직임을 감지하고 있습니다',
            variant: 'inactive' as StatusVariant,
          };
      }
    };

    const status = getMotionStatus();
    const badgeText = state.isDetecting ? '활성' : '비활성';
    const badgeVariant = state.isDetecting ? 'success' : 'neutral';

    return (
      <View>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="h3" weight="bold">
              걷기/뛰기 감지 테스트
            </Text>
            <Badge text={badgeText} variant={badgeVariant} testID="motion-badge" />
          </View>

          <StatusIndicator
            icon={status.icon}
            statusText={status.text}
            statusSubtext={status.subtext}
            variant={status.variant}
            testID="motion-status"
          />

          <Button
            title={state.isDetecting ? '모션 감지 중지' : '모션 감지 시작'}
            variant={state.isDetecting ? 'danger' : 'success'}
            onPress={handleStartStop}
            disabled={!isInitialized || isLoading}
            testID="motion-button"
            style={styles.button}
          />
        </Card>

        <Card style={styles.infoCard}>
          <Text variant="body" weight="semibold">
            💡 테스트 목적:
          </Text>
          <Text variant="caption" style={styles.infoText}>
            걷기와 뛰기 활동을 실시간으로 감지합니다.
          </Text>
        </Card>
      </View>
    );
  };

  // Render Integrated Tab
  const renderIntegratedTab = () => {
    const getIntegratedStatus = () => {
      if (!state.isDetecting) {
        return {
          icon: '🔄',
          text: '통합 시나리오 대기 중',
          subtext: '차량 하차 후 자동으로 모션 감지가 시작됩니다',
          variant: 'inactive' as StatusVariant,
        };
      }

      if (state.vehicleState === 'exited') {
        return {
          icon: '🚗➡️🚶',
          text: '하차 완료 - 모션 감지 전환',
          subtext: '차량 하차 감지, 곧 모션 감지로 전환됩니다',
          variant: 'walking' as StatusVariant,
        };
      }

      switch (state.currentActivity) {
        case 'walking':
          return {
            icon: '🚶',
            text: '걷기 감지됨',
            subtext: '하차 후 걷기 활동 감지 중',
            variant: 'walking' as StatusVariant,
          };
        case 'running':
          return {
            icon: '🏃',
            text: '뛰기 감지됨',
            subtext: '하차 후 뛰기 활동 감지 중',
            variant: 'running' as StatusVariant,
          };
        default:
          return {
            icon: '🔄',
            text: '통합 시나리오 실행 중',
            subtext: '차량 하차 감지 및 모션 감지 진행 중',
            variant: 'inactive' as StatusVariant,
          };
      }
    };

    const status = getIntegratedStatus();
    const badgeText = state.isDetecting ? '실행 중' : '대기 중';
    const badgeVariant = state.isDetecting ? 'success' : 'neutral';

    return (
      <View>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="h3" weight="bold">
              통합 시나리오 테스트
            </Text>
            <Badge text={badgeText} variant={badgeVariant} testID="integrated-badge" />
          </View>

          <StatusIndicator
            icon={status.icon}
            statusText={status.text}
            statusSubtext={status.subtext}
            variant={status.variant}
            testID="integrated-status"
          />

          <Button
            title={state.isDetecting ? '통합 테스트 중지' : '통합 테스트 시작'}
            variant={state.isDetecting ? 'danger' : 'primary'}
            onPress={handleStartStop}
            disabled={!isInitialized || isLoading}
            testID="integrated-button"
            style={styles.button}
          />
        </Card>

        <Card style={styles.infoCard}>
          <Text variant="body" weight="semibold">
            💡 테스트 목적:
          </Text>
          <Text variant="caption" style={styles.infoText}>
            차량 하차 감지 → 걷기/뛰기 감지로 자동 전환되는 완전한 시나리오를 테스트합니다.
          </Text>
        </Card>
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      testID="dashboard-screen">
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="h1" weight="bold" style={styles.title}>
            테스트 대시보드
          </Text>
        </View>

        <TabBar
          tabs={TABS}
          activeTab={state.detectionMode}
          onTabChange={handleTabChange}
          testID="dashboard-tabs"
        />

        {state.detectionMode === 'vehicle-exit' && renderVehicleExitTab()}
        {state.detectionMode === 'motion' && renderMotionTab()}
        {state.detectionMode === 'integrated' && renderIntegratedTab()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  button: {
    marginTop: 24,
  },
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  infoText: {
    marginTop: 4,
  },
});
