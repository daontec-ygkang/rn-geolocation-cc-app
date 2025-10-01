/**
 * Navigation Type Definitions
 * Type-safe navigation parameters for React Navigation
 */

import type {StackNavigationProp} from '@react-navigation/stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp, RouteProp} from '@react-navigation/native';

/**
 * Root Stack Navigator Parameters
 */
export type RootStackParamList = {
  Main: undefined;
  Permissions: undefined;
};

/**
 * Main Tab Navigator Parameters
 */
export type MainTabParamList = {
  Dashboard: undefined;
  Logs: undefined;
  Settings: undefined;
};

/**
 * Root Stack Navigation Prop
 */
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

/**
 * Main Tab Navigation Prop
 */
export type MainTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  RootStackNavigationProp
>;

/**
 * Screen-specific Navigation Props
 */
export type DashboardScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Dashboard'>,
  RootStackNavigationProp
>;

export type LogsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Logs'>,
  RootStackNavigationProp
>;

export type SettingsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Settings'>,
  RootStackNavigationProp
>;

export type PermissionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Permissions'
>;

/**
 * Screen-specific Route Props
 */
export type DashboardScreenRouteProp = RouteProp<MainTabParamList, 'Dashboard'>;
export type LogsScreenRouteProp = RouteProp<MainTabParamList, 'Logs'>;
export type SettingsScreenRouteProp = RouteProp<MainTabParamList, 'Settings'>;
export type PermissionsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Permissions'
>;
