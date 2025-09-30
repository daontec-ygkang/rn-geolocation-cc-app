/**
 * Mock @react-navigation/native for testing
 */

import React from 'react';
import {View} from 'react-native';

export const NavigationContainer = ({children}: any) => (
  <View testID="navigation-container">{children}</View>
);

export const useNavigation = jest.fn(() => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  setOptions: jest.fn(),
}));

export const useRoute = jest.fn(() => ({
  params: {},
  key: 'test-route',
  name: 'Test',
}));

export const useFocusEffect = jest.fn();
export const useIsFocused = jest.fn(() => true);
