/**
 * AppContext
 * Global application state management with AsyncStorage persistence
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState, initialAppState, ActivityType, Log} from '../types/AppState';

const STORAGE_KEY = 'app_state';
const DEBOUNCE_DELAY = 500; // ms

interface AppContextType {
  state: AppState;
  updateState: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
  addLog: (activity: ActivityType, duration: number) => void;
  clearLogs: () => void;
  resetStatistics: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [state, setState] = useState<AppState>(initialAppState);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load state from AsyncStorage on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          setState(parsedState);
        }
      } catch (error) {
        console.error('[AppContext] Error loading state:', error);
        // Fall back to initial state
      }
    };

    loadState();
  }, []);

  // Save state to AsyncStorage with debouncing
  const saveState = useCallback((newState: AppState) => {
    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (error) {
        console.error('[AppContext] Error saving state:', error);
      }
    }, DEBOUNCE_DELAY);
  }, []);

  // Update state by key
  const updateState = useCallback(
    <K extends keyof AppState>(key: K, value: AppState[K]) => {
      setState(prevState => {
        const newState = {...prevState, [key]: value};
        saveState(newState);
        return newState;
      });
    },
    [saveState],
  );

  // Add log entry and update statistics
  const addLog = useCallback(
    (activity: ActivityType, duration: number) => {
      setState(prevState => {
        // Create new log entry
        const newLog: Log = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
          activity,
          duration,
        };

        // Update statistics
        const newStatistics = {...prevState.statistics};
        newStatistics.totalTime += duration;

        if (activity === 'walking') {
          newStatistics.walkingTime += duration;
        } else if (activity === 'running') {
          newStatistics.runningTime += duration;
        }

        const newState = {
          ...prevState,
          logs: [...prevState.logs, newLog],
          statistics: newStatistics,
        };

        saveState(newState);
        return newState;
      });
    },
    [saveState],
  );

  // Clear all logs
  const clearLogs = useCallback(() => {
    setState(prevState => {
      const newState = {
        ...prevState,
        logs: [],
      };
      saveState(newState);
      return newState;
    });
  }, [saveState]);

  // Reset statistics
  const resetStatistics = useCallback(() => {
    setState(prevState => {
      const newState = {
        ...prevState,
        statistics: {
          totalTime: 0,
          walkingTime: 0,
          runningTime: 0,
        },
      };
      saveState(newState);
      return newState;
    });
  }, [saveState]);

  const value: AppContextType = {
    state,
    updateState,
    addLog,
    clearLogs,
    resetStatistics,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
