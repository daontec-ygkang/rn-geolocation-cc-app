/**
 * AppContext Tests
 * TDD test suite for global state management
 */

import React from 'react';
import {renderHook, act} from '@testing-library/react-native';
import {AppProvider, useApp} from '../AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityType} from '../../types/AppState';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('AppContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  });

  describe('Provider and Hook', () => {
    it('should provide initial state', () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      expect(result.current.state.isDetecting).toBe(false);
      expect(result.current.state.currentActivity).toBe('inactive');
      expect(result.current.state.permissions.location).toBe(false);
      expect(result.current.state.permissions.activity).toBe(false);
      expect(result.current.state.permissions.notifications).toBe(false);
      expect(result.current.state.settings.darkMode).toBe(false);
      expect(result.current.state.settings.sensitivity).toBe('medium');
      expect(result.current.state.logs).toEqual([]);
      expect(result.current.state.statistics.totalTime).toBe(0);
    });

    it('should throw error when useApp used outside provider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        renderHook(() => useApp());
      }).toThrow('useApp must be used within AppProvider');

      console.error = originalError;
    });
  });

  describe('State Updates', () => {
    it('should update isDetecting state', () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      act(() => {
        result.current.updateState('isDetecting', true);
      });

      expect(result.current.state.isDetecting).toBe(true);
    });

    it('should update currentActivity state', () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      act(() => {
        result.current.updateState('currentActivity', 'walking');
      });

      expect(result.current.state.currentActivity).toBe('walking');
    });

    it('should update nested permissions state', () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      act(() => {
        result.current.updateState('permissions', {
          ...result.current.state.permissions,
          location: true,
        });
      });

      expect(result.current.state.permissions.location).toBe(true);
      expect(result.current.state.permissions.activity).toBe(false);
    });

    it('should update nested settings state', () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      act(() => {
        result.current.updateState('settings', {
          ...result.current.state.settings,
          darkMode: true,
        });
      });

      expect(result.current.state.settings.darkMode).toBe(true);
    });
  });

  describe('AsyncStorage Integration', () => {
    it('should load state from AsyncStorage on mount', async () => {
      const savedState = {
        isDetecting: true,
        currentActivity: 'walking' as ActivityType,
        permissions: {location: true, activity: true, notifications: false},
        settings: {darkMode: true, sensitivity: 'high' as const, notificationsEnabled: true},
        logs: [],
        statistics: {totalTime: 3600, walkingTime: 2400, runningTime: 1200},
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(savedState),
      );

      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      // Wait for AsyncStorage to load
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('app_state');
      expect(result.current.state.isDetecting).toBe(true);
      expect(result.current.state.currentActivity).toBe('walking');
      expect(result.current.state.permissions.location).toBe(true);
      expect(result.current.state.settings.darkMode).toBe(true);
    });

    it('should save state to AsyncStorage when updated', async () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      await act(async () => {
        result.current.updateState('isDetecting', true);
        // Allow debounce time
        await new Promise(resolve => setTimeout(resolve, 600));
      });

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'app_state',
        expect.stringContaining('"isDetecting":true'),
      );
    });

    it('should handle AsyncStorage errors gracefully', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(
        new Error('Storage error'),
      );

      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      // Should fall back to initial state
      expect(result.current.state.isDetecting).toBe(false);
    });
  });

  describe('Utility Methods', () => {
    it('should add log entry', () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      act(() => {
        result.current.addLog('walking', 1800);
      });

      expect(result.current.state.logs).toHaveLength(1);
      expect(result.current.state.logs[0].activity).toBe('walking');
      expect(result.current.state.logs[0].duration).toBe(1800);
      expect(result.current.state.logs[0].id).toBeDefined();
      expect(result.current.state.logs[0].timestamp).toBeDefined();
    });

    it('should update statistics when adding log', () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      act(() => {
        result.current.addLog('walking', 1800);
      });

      expect(result.current.state.statistics.totalTime).toBe(1800);
      expect(result.current.state.statistics.walkingTime).toBe(1800);
      expect(result.current.state.statistics.runningTime).toBe(0);

      act(() => {
        result.current.addLog('running', 1200);
      });

      expect(result.current.state.statistics.totalTime).toBe(3000);
      expect(result.current.state.statistics.walkingTime).toBe(1800);
      expect(result.current.state.statistics.runningTime).toBe(1200);
    });

    it('should clear logs', () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      act(() => {
        result.current.addLog('walking', 1800);
        result.current.addLog('running', 1200);
      });

      expect(result.current.state.logs).toHaveLength(2);

      act(() => {
        result.current.clearLogs();
      });

      expect(result.current.state.logs).toHaveLength(0);
    });

    it('should reset statistics', () => {
      const {result} = renderHook(() => useApp(), {
        wrapper: AppProvider,
      });

      act(() => {
        result.current.addLog('walking', 1800);
        result.current.addLog('running', 1200);
      });

      expect(result.current.state.statistics.totalTime).toBeGreaterThan(0);

      act(() => {
        result.current.resetStatistics();
      });

      expect(result.current.state.statistics.totalTime).toBe(0);
      expect(result.current.state.statistics.walkingTime).toBe(0);
      expect(result.current.state.statistics.runningTime).toBe(0);
    });
  });
});
