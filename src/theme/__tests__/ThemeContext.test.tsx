import React from 'react';
import {renderHook, act} from '@testing-library/react-native';
import {ThemeProvider, useTheme} from '../ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme, darkTheme} from '../theme';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ThemeProvider and useTheme', () => {
    it('should provide initial light theme', () => {
      const {result} = renderHook(() => useTheme(), {
        wrapper: ({children}) => <ThemeProvider>{children}</ThemeProvider>,
      });

      expect(result.current.themeMode).toBe('light');
      expect(result.current.theme).toEqual(lightTheme);
    });

    it('should throw error when useTheme is used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within ThemeProvider');

      consoleError.mockRestore();
    });

    it('should toggle theme from light to dark', async () => {
      const {result} = renderHook(() => useTheme(), {
        wrapper: ({children}) => <ThemeProvider>{children}</ThemeProvider>,
      });

      await act(async () => {
        result.current.toggleTheme();
      });

      expect(result.current.themeMode).toBe('dark');
      expect(result.current.theme).toEqual(darkTheme);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme_mode', 'dark');
    });

    it('should toggle theme from dark to light', async () => {
      const {result} = renderHook(() => useTheme(), {
        wrapper: ({children}) => (
          <ThemeProvider initialMode="dark">{children}</ThemeProvider>
        ),
      });

      await act(async () => {
        result.current.toggleTheme();
      });

      expect(result.current.themeMode).toBe('light');
      expect(result.current.theme).toEqual(lightTheme);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme_mode', 'light');
    });

    it('should set theme mode directly', async () => {
      const {result} = renderHook(() => useTheme(), {
        wrapper: ({children}) => <ThemeProvider>{children}</ThemeProvider>,
      });

      await act(async () => {
        result.current.setThemeMode('dark');
      });

      expect(result.current.themeMode).toBe('dark');
      expect(result.current.theme).toEqual(darkTheme);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme_mode', 'dark');
    });

    it('should load theme mode from AsyncStorage on mount', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('dark');

      const {result} = renderHook(() => useTheme(), {
        wrapper: ({children}) => <ThemeProvider>{children}</ThemeProvider>,
      });

      // Wait for async load to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('theme_mode');
      expect(result.current.themeMode).toBe('dark');
      expect(result.current.theme).toEqual(darkTheme);
    });

    it('should handle AsyncStorage errors gracefully when loading', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('Storage error'),
      );

      const {result} = renderHook(() => useTheme(), {
        wrapper: ({children}) => <ThemeProvider>{children}</ThemeProvider>,
      });

      // Wait for async load to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      // Should fall back to initial mode (light)
      expect(result.current.themeMode).toBe('light');
      expect(result.current.theme).toEqual(lightTheme);

      consoleError.mockRestore();
    });

    it('should handle AsyncStorage errors gracefully when saving', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
        new Error('Storage error'),
      );

      const {result} = renderHook(() => useTheme(), {
        wrapper: ({children}) => <ThemeProvider>{children}</ThemeProvider>,
      });

      await act(async () => {
        result.current.setThemeMode('dark');
      });

      // Theme should still change even if storage fails
      expect(result.current.themeMode).toBe('dark');
      expect(result.current.theme).toEqual(darkTheme);

      consoleError.mockRestore();
    });

    it('should ignore invalid theme mode from AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('invalid');

      const {result} = renderHook(() => useTheme(), {
        wrapper: ({children}) => <ThemeProvider>{children}</ThemeProvider>,
      });

      // Wait for async load to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      // Should keep initial mode
      expect(result.current.themeMode).toBe('light');
      expect(result.current.theme).toEqual(lightTheme);
    });

    it('should use initialMode prop', () => {
      const {result} = renderHook(() => useTheme(), {
        wrapper: ({children}) => (
          <ThemeProvider initialMode="dark">{children}</ThemeProvider>
        ),
      });

      expect(result.current.themeMode).toBe('dark');
      expect(result.current.theme).toEqual(darkTheme);
    });
  });
});
