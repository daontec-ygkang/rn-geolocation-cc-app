/**
 * Mock @react-navigation/stack for testing
 */

import React from 'react';
import {View} from 'react-native';

export const createStackNavigator = jest.fn(() => ({
  Navigator: ({children, testID, screenOptions}: any) => (
    <View testID={testID}>{children}</View>
  ),
  Screen: ({component: Component, name}: any) => {
    if (Component) {
      return <Component />;
    }
    return null;
  },
}));

export const CardStyleInterpolators = {
  forHorizontalIOS: jest.fn(),
  forVerticalIOS: jest.fn(),
  forFadeFromBottomAndroid: jest.fn(),
};

export const TransitionSpecs = {
  TransitionIOSSpec: jest.fn(),
  FadeInFromBottomAndroidSpec: jest.fn(),
};
