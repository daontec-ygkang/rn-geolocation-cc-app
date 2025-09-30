/**
 * Root Stack Navigator
 * Top-level navigation structure for the application
 *
 * Navigation Hierarchy:
 * - Main (MainNavigator with Bottom Tabs)
 * - Permissions (Full-screen permission request)
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainNavigator} from './MainNavigator';
import {PermissionsScreen} from '../screens/PermissionsScreen';
import type {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * RootNavigator Component
 *
 * Provides the root-level Stack navigation for the app.
 * The Main screen contains the bottom tab navigator with Dashboard, Logs, and Settings.
 * The Permissions screen is presented as a full-screen modal for requesting app permissions.
 *
 * @example
 * ```tsx
 * <NavigationContainer>
 *   <RootNavigator />
 * </NavigationContainer>
 * ```
 */
export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      testID="root-navigator"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen
        name="Permissions"
        component={PermissionsScreen}
        options={{
          headerShown: true,
          title: 'Permissions',
        }}
      />
    </Stack.Navigator>
  );
};
