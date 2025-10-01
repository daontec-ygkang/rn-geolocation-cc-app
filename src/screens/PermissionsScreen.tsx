/**
 * Permissions Screen
 * Displays and manages app permissions
 */

import React, {useCallback} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {useApp} from '../contexts/AppContext';
import {PermissionCard, Text, Card} from '../components';
import type {PermissionsScreenNavigationProp} from '../navigation/types';

interface PermissionsScreenProps {
  navigation: PermissionsScreenNavigationProp;
}

export const PermissionsScreen: React.FC<PermissionsScreenProps> = () => {
  const {theme} = useTheme();
  const {state, updateState} = useApp();

  /**
   * Handle location permission request
   */
  const handleLocationRequest = useCallback(() => {
    // TODO: Phase 2.3 - Implement actual permission request with react-native-permissions
    Alert.alert(
      '권한 요청',
      '위치 권한 요청 기능은 Phase 2.3에서 구현됩니다.',
      [
        {
          text: '확인',
          onPress: () => {
            // Simulate permission granted for demo
            updateState('permissions', {
              ...state.permissions,
              location: true,
            });
          },
        },
      ],
    );
  }, [state.permissions, updateState]);

  /**
   * Handle activity recognition permission request
   */
  const handleActivityRequest = useCallback(() => {
    // TODO: Phase 2.3 - Implement actual permission request
    Alert.alert(
      '권한 요청',
      '활동 인식 권한 요청 기능은 Phase 2.3에서 구현됩니다.',
      [
        {
          text: '확인',
          onPress: () => {
            // Simulate permission granted for demo
            updateState('permissions', {
              ...state.permissions,
              activity: true,
            });
          },
        },
      ],
    );
  }, [state.permissions, updateState]);

  /**
   * Handle notifications permission request
   */
  const handleNotificationsRequest = useCallback(() => {
    // TODO: Phase 2.3 - Implement actual permission request
    Alert.alert(
      '권한 요청',
      '알림 권한 요청 기능은 Phase 2.3에서 구현됩니다.',
      [
        {
          text: '확인',
          onPress: () => {
            // Simulate permission granted for demo
            updateState('permissions', {
              ...state.permissions,
              notifications: true,
            });
          },
        },
      ],
    );
  }, [state.permissions, updateState]);

  /**
   * Get permission status
   */
  const getPermissionStatus = (
    granted: boolean,
  ): 'granted' | 'denied' | 'not-requested' => {
    if (granted) {
      return 'granted';
    }
    return 'not-requested';
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      testID="permissions-screen">
      <View style={styles.content}>
        {/* Header */}
        <Text variant="h1" weight="bold" style={styles.header}>
          권한 설정
        </Text>

        <Text variant="body" style={styles.subtitle}>
          앱이 제대로 작동하려면 아래 권한이 필요합니다
        </Text>

        {/* Permission Cards */}
        <PermissionCard
          title="위치 권한"
          description="차량 하차 및 모션 감지를 위해 필요합니다"
          icon="📍"
          status={getPermissionStatus(state.permissions.location)}
          onRequest={handleLocationRequest}
          testID="location-permission-card"
        />

        <PermissionCard
          title="활동 인식 권한"
          description="걷기와 뛰기 활동을 감지하기 위해 필요합니다"
          icon="🏃"
          status={getPermissionStatus(state.permissions.activity)}
          onRequest={handleActivityRequest}
          testID="activity-permission-card"
        />

        <PermissionCard
          title="알림 권한"
          description="활동 감지 알림을 받기 위해 필요합니다"
          icon="🔔"
          status={getPermissionStatus(state.permissions.notifications)}
          onRequest={handleNotificationsRequest}
          testID="notifications-permission-card"
        />

        {/* Info Card */}
        <Card style={styles.infoCard}>
          <Text variant="body" weight="semibold" style={styles.infoTitle}>
            💡 권한 안내
          </Text>
          <Text variant="caption" style={styles.infoText}>
            • 위치 권한: 백그라운드에서도 위치를 추적합니다
          </Text>
          <Text variant="caption" style={styles.infoText}>
            • 활동 인식: 걷기, 뛰기 등의 활동을 자동으로 감지합니다
          </Text>
          <Text variant="caption" style={styles.infoText}>
            • 알림: 활동 감지 시 알림을 보냅니다
          </Text>
          <Text variant="caption" style={styles.infoText}>
            • 권한은 설정에서 언제든지 변경할 수 있습니다
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
    padding: 20,
  },
  header: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
    opacity: 0.7,
  },
  infoCard: {
    marginTop: 8,
  },
  infoTitle: {
    marginBottom: 12,
  },
  infoText: {
    marginBottom: 6,
    lineHeight: 20,
  },
});
