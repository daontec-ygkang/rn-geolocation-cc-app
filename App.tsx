/**
 * React Native Motion Detection App
 * Main application entry point with all infrastructure providers
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from './src/contexts/AppContext';
import {ThemeProvider} from './src/theme/ThemeContext';
import {RootNavigator} from './src/navigation/RootNavigator';

/**
 * Main App Component
 *
 * Provider hierarchy:
 * 1. SafeAreaProvider - Safe area insets for device notches
 * 2. AppProvider - Global app state management
 * 3. ThemeProvider - Design system and theme support
 * 4. NavigationContainer - React Navigation integration
 * 5. RootNavigator - App navigation structure
 */
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <ThemeProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
