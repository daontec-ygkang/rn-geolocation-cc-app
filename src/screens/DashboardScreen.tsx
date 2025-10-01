/**
 * Dashboard Screen (Placeholder)
 * Full implementation in Phase 2
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {DashboardScreenNavigationProp} from '../navigation/types';

interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  return (
    <View style={styles.container} testID="dashboard-screen">
      <Text style={styles.title}>Dashboard</Text>
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
