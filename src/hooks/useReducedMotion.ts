import { useDesignSystem } from '../theme/useTheme';

/**
 * Returns `true` when the user enabled "Reduce Motion" in the OS accessibility settings.
 * The value is tracked once by `DesignSystemProvider`; animated components use it to skip or
 * shorten non-essential animations.
 */
export function useReducedMotion(): boolean {
  return useDesignSystem().reducedMotion;
}
