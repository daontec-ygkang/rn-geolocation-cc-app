/**
 * ThemeContext - Provides theme management with dark mode support
 * Persists theme preference to AsyncStorage
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Theme, ThemeMode, getTheme, lightTheme} from './theme';

const THEME_STORAGE_KEY = 'theme_mode';

/**
 * Theme context value type
 */
interface ThemeContextType {
  /** Current theme object with all design tokens */
  theme: Theme;
  /** Current theme mode (light or dark) */
  themeMode: ThemeMode;
  /** Toggle between light and dark mode */
  toggleTheme: () => void;
  /** Set specific theme mode */
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider props
 */
interface ThemeProviderProps {
  /** Child components */
  children: ReactNode;
  /** Initial theme mode (defaults to 'light') */
  initialMode?: ThemeMode;
}

/**
 * ThemeProvider - Wraps app to provide theme context
 * Loads theme preference from AsyncStorage on mount
 * Saves theme changes to AsyncStorage automatically
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'light',
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(initialMode);
  const [theme, setTheme] = useState<Theme>(getTheme(initialMode));

  // Load theme mode from AsyncStorage on mount
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedMode === 'light' || savedMode === 'dark') {
          setThemeModeState(savedMode);
          setTheme(getTheme(savedMode));
        }
      } catch (error) {
        console.error('[ThemeContext] Error loading theme mode:', error);
      }
    };
    loadThemeMode();
  }, []);

  // Save theme mode to AsyncStorage when it changes
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    // Update state first, then save to storage
    setThemeModeState(mode);
    setTheme(getTheme(mode));

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('[ThemeContext] Error saving theme mode:', error);
      // State is already updated, so theme change still applies
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  }, [themeMode, setThemeMode]);

  const value: ThemeContextType = {
    theme,
    themeMode,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * useTheme - Hook to access theme context
 * Must be used within ThemeProvider
 *
 * @returns Theme context with current theme and theme controls
 * @throws Error if used outside ThemeProvider
 *
 * @example
 * ```tsx
 * const { theme, themeMode, toggleTheme } = useTheme();
 * const textColor = theme.colors.text;
 * ```
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Export default theme for use outside of context
export {lightTheme};
