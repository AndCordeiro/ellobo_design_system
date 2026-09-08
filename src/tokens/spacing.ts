/**
 * Spacing scale (4pt grid).
 *
 * Numeric keys are the primitive scale. Semantic aliases are the public vocabulary used by
 * component props such as `padding="md"` or `gap="lg"`.
 */
export const spacingScale = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const spacingAliases = {
  none: spacingScale[0],
  xs: spacingScale[1],
  sm: spacingScale[2],
  md: spacingScale[4],
  lg: spacingScale[6],
  xl: spacingScale[8],
  '2xl': spacingScale[12],
  '3xl': spacingScale[16],
} as const;

export const spacing = { ...spacingScale, ...spacingAliases };

export type SpacingScaleKey = keyof typeof spacingScale;
export type SpacingToken = keyof typeof spacingAliases;
