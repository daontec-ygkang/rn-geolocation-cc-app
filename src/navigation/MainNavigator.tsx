/**
 * Main Tab Navigator
 * Bottom tab navigation for main app screens
 *
 * Tabs:
 * - Dashboard: Main screen with activity tracking
 * - Logs: Activity history and statistics
 * - Settings: App configuration and preferences
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DashboardScreen} from '../screens/DashboardScreen';
import {LogsScreen} from '../screens/LogsScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import type {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * MainNavigator Component
 *
 * Provides bottom tab navigation for the main app screens.
 * Uses theme colors for active/inactive states and maintains consistent styling.
 *
 * Tab Screens:
 * - Dashboard (대시보드): Primary screen for motion detection controls
 * - Logs (로그): Activity history and detailed statistics
 * - Settings (설정): App preferences and configuration
 *
 * @example
 * ```tsx
 * <Stack.Screen name="Main" component={MainNavigator} />
 * ```
 */
export const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      testID="main-navigator"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarIcon: () => null, // Explicitly disable icons for Phase 1
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarLabel: '대시보드',
          tabBarTestID: 'tab-dashboard',
        }}
      />
      <Tab.Screen
        name="Logs"
        component={LogsScreen}
        options={{
          title: 'Logs',
          tabBarLabel: '로그',
          tabBarTestID: 'tab-logs',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarLabel: '설정',
          tabBarTestID: 'tab-settings',
        }}
      />
    </Tab.Navigator>
  );
};
