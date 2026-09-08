/**
 * Elevation tokens.
 *
 * Each level carries both the iOS shadow properties and the Android `elevation` value so that
 * components never have to spread `shadow*` styles by hand. The shadow color itself is defined
 * by the theme, because light and dark surfaces need different shadow intensities.
 */
export type ElevationLevel = 'none' | 'sm' | 'md' | 'lg';

export interface ElevationValue {
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export const elevation: Record<ElevationLevel, ElevationValue> = {
  none: { shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
  sm: { shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 },
  md: { shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  lg: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 10,
  },
};
