/**
 * Permissions Screen (Placeholder)
 * Full implementation in Phase 2
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {PermissionsScreenNavigationProp} from '../navigation/types';

interface PermissionsScreenProps {
  navigation: PermissionsScreenNavigationProp;
}

export const PermissionsScreen: React.FC<PermissionsScreenProps> = () => {
  return (
    <View style={styles.container} testID="permissions-screen">
      <Text style={styles.title}>Permissions</Text>
      <Text style={styles.subtitle}>Phase 2 Implementation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
});
