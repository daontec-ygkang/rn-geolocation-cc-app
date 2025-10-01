/**
 * PermissionCard Component
 * Displays permission status and request button
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from './Card';
import {Text} from './Text';
import {Button} from './Button';
import {Badge} from './Badge';
import {useTheme} from '../theme/ThemeContext';

export interface PermissionCardProps {
  title: string;
  description: string;
  icon: string;
  status: 'granted' | 'denied' | 'not-requested';
  onRequest: () => void;
  testID?: string;
}

/**
 * Get status badge variant and text
 */
const getStatusInfo = (status: PermissionCardProps['status']) => {
  switch (status) {
    case 'granted':
      return {
        variant: 'success' as const,
        text: '허용됨',
      };
    case 'denied':
      return {
        variant: 'danger' as const,
        text: '거부됨',
      };
    case 'not-requested':
      return {
        variant: 'inactive' as const,
        text: '요청 필요',
      };
  }
};

export const PermissionCard: React.FC<PermissionCardProps> = ({
  title,
  description,
  icon,
  status,
  onRequest,
  testID,
}) => {
  const {theme} = useTheme();
  const statusInfo = getStatusInfo(status);
  const showRequestButton = status === 'not-requested' || status === 'denied';

  return (
    <Card style={styles.card} testID={testID}>
      <Text variant="h1" style={styles.icon}>
        {icon}
      </Text>

      <Text variant="h3" weight="bold" style={styles.title}>
        {title}
      </Text>

      <Text variant="body" style={styles.description}>
        {description}
      </Text>

      <Badge
        text={statusInfo.text}
        variant={statusInfo.variant}
        testID={`${testID}-status-badge`}
      />

      {showRequestButton && (
        <Button
          title={status === 'denied' ? '설정으로 이동' : '권한 요청'}
          variant="primary"
          onPress={onRequest}
          style={styles.button}
          testID={`${testID}-request-button`}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
});
