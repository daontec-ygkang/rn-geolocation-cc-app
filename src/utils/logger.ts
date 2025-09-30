// Logger utility for debugging and development
/* eslint-disable no-console */

export const logger = {
  log: (message: string, ...args: unknown[]) => {
    if (__DEV__) {
      console.log(`[LOG] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    if (__DEV__) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (__DEV__) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: unknown[]) => {
    if (__DEV__) {
      console.info(`[INFO] ${message}`, ...args);
    }
  },
};