/**
 * Mock @react-navigation/bottom-tabs for testing
 */

import React from 'react';
import {View} from 'react-native';

export const createBottomTabNavigator = jest.fn(() => ({
  Navigator: ({children, testID, screenOptions}: any) => (
    <View testID={testID}>{children}</View>
  ),
  Screen: ({component: Component, name, options}: any) => {
    if (Component) {
      return <Component />;
    }
    return null;
  },
}));
