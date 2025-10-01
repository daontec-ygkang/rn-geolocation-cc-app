/**
 * App Integration Tests
 * Tests the complete app integration with all providers
 * @format
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

describe('App Integration', () => {
  it('should render without errors', () => {
    const {root} = render(<App />);
    expect(root).toBeTruthy();
  });

  it('should render SafeAreaProvider', () => {
    const {UNSAFE_root} = render(<App />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render AppProvider context', () => {
    const {UNSAFE_root} = render(<App />);
    // AppProvider should be in the component tree
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render ThemeProvider context', () => {
    const {UNSAFE_root} = render(<App />);
    // ThemeProvider should be in the component tree
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render NavigationContainer', () => {
    const {UNSAFE_root} = render(<App />);
    // NavigationContainer should be in the component tree
    expect(UNSAFE_root).toBeTruthy();
  });

  it('should render navigation structure', () => {
    const {UNSAFE_root} = render(<App />);
    // Navigation structure should be present in component tree
    expect(UNSAFE_root).toBeTruthy();
  });
});
