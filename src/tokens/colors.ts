/**
 * Primitive color palette.
 *
 * These values are the raw building blocks of the system. Components must never consume them
 * directly: they are mapped into semantic tokens by the light and dark themes.
 */
export const palette = {
  white: '#FFFFFF',
  black: '#000000',

  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#0B0F17',
  },

  indigo: {
    50: '#EDF2FF',
    100: '#DBE4FF',
    200: '#BAC8FF',
    300: '#91A7FF',
    400: '#748FFC',
    500: '#5C7CFA',
    600: '#4C6EF5',
    700: '#4263EB',
    800: '#3B5BDB',
    900: '#364FC7',
  },

  violet: {
    50: '#F3F0FF',
    100: '#E5DBFF',
    200: '#D0BFFF',
    300: '#B197FC',
    400: '#9775FA',
    500: '#845EF7',
    600: '#7950F2',
    700: '#7048E8',
    800: '#6741D9',
    900: '#5F3DC4',
  },

  teal: {
    50: '#E6FCF5',
    100: '#C3FAE8',
    200: '#96F2D7',
    300: '#63E6BE',
    400: '#38D9A9',
    500: '#20C997',
    600: '#12B886',
    700: '#0CA678',
    800: '#099268',
    900: '#087F5B',
  },

  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#0F2A1C',
  },

  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#2E2410',
  },

  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#2D1414',
  },

  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#14213A',
  },
} as const;

export type Palette = typeof palette;
