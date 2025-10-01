/**
 * Theme System
 * Design tokens based on docs/prototype/index-single.html CSS variables
 */

/**
 * Theme interface defining the complete design token system
 * Includes colors, spacing, typography, radius, shadows, and transitions
 */
export interface Theme {
  colors: {
    // Primary Colors
    primary: string;
    primaryDark: string;
    primaryLight: string;

    // Success Colors
    success: string;
    successDark: string;
    successLight: string;

    // Warning Colors
    warning: string;
    warningDark: string;
    warningLight: string;

    // Danger Colors
    danger: string;
    dangerDark: string;
    dangerLight: string;

    // Neutral Color Scale
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
    neutral900: string;

    // Semantic Colors
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;

    // Activity Status Colors
    walking: string;
    running: string;
    inactive: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
  };
  typography: {
    fontFamily: {
      base: string;
      mono: string;
    };
    fontSize: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
      '4xl': number;
      '5xl': number;
    };
    fontWeight: {
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: {
    sm: {
      shadowColor: string;
      shadowOffset: {width: number; height: number};
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    md: {
      shadowColor: string;
      shadowOffset: {width: number; height: number};
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    lg: {
      shadowColor: string;
      shadowOffset: {width: number; height: number};
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    xl: {
      shadowColor: string;
      shadowOffset: {width: number; height: number};
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  transitions: {
    fast: number;
    base: number;
    slow: number;
  };
}

/**
 * Light theme with bright background and dark text
 * Default theme for the application
 */
export const lightTheme: Theme = {
  colors: {
    // Primary Colors
    primary: '#2563eb',
    primaryDark: '#1e40af',
    primaryLight: '#3b82f6',

    // Success Colors
    success: '#10b981',
    successDark: '#059669',
    successLight: '#34d399',

    // Warning Colors
    warning: '#f59e0b',
    warningDark: '#d97706',
    warningLight: '#fbbf24',

    // Danger Colors
    danger: '#ef4444',
    dangerDark: '#dc2626',
    dangerLight: '#f87171',

    // Neutral Color Scale
    neutral50: '#f9fafb',
    neutral100: '#f3f4f6',
    neutral200: '#e5e7eb',
    neutral300: '#d1d5db',
    neutral400: '#9ca3af',
    neutral500: '#6b7280',
    neutral600: '#4b5563',
    neutral700: '#374151',
    neutral800: '#1f2937',
    neutral900: '#111827',

    // Semantic Colors (Light Mode)
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',

    // Activity Status Colors
    walking: '#10b981', // success color
    running: '#f59e0b', // warning color
    inactive: '#9ca3af', // neutral-400
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  typography: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Helvetica Neue, sans-serif',
      mono: 'SF Mono, Monaco, Cascadia Code, Courier New, monospace',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 20},
      shadowOpacity: 0.1,
      shadowRadius: 25,
      elevation: 12,
    },
  },
  transitions: {
    fast: 150,
    base: 250,
    slow: 350,
  },
};

/**
 * Dark theme with dark background and light text
 * Optimized for low-light environments
 */
export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // Semantic Colors (Dark Mode)
    background: '#111827', // neutral-900
    surface: '#1f2937', // neutral-800
    text: '#f9fafb', // neutral-50
    textSecondary: '#9ca3af', // neutral-400
    border: '#374151', // neutral-700
  },
};

/**
 * Theme mode type - light or dark
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Get theme object based on mode
 * @param mode - 'light' or 'dark'
 * @returns Theme object with all design tokens
 */
export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
