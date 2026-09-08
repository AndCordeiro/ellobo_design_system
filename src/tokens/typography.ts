/**
 * Typography scale.
 *
 * Font families are intentionally absent: the consuming app loads its own fonts and maps them
 * through `theme.typography.fontFamily`.
 */
export type FontWeightKey = 'regular' | 'medium' | 'semibold' | 'bold';

export type FontWeightValue = '400' | '500' | '600' | '700' | '800' | '900' | '300' | '200' | '100';

export type TypographyVariantName =
  | 'displayLarge'
  | 'displayMedium'
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'caption';

export interface TypographyVariant {
  fontSize: number;
  lineHeight: number;
  weight: FontWeightKey;
  letterSpacing: number;
}

export const fontWeights: Record<FontWeightKey, FontWeightValue> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const typographyVariants: Record<TypographyVariantName, TypographyVariant> = {
  displayLarge: { fontSize: 40, lineHeight: 48, weight: 'bold', letterSpacing: -0.8 },
  displayMedium: { fontSize: 32, lineHeight: 40, weight: 'bold', letterSpacing: -0.6 },
  headingLarge: { fontSize: 28, lineHeight: 36, weight: 'bold', letterSpacing: -0.4 },
  headingMedium: { fontSize: 24, lineHeight: 32, weight: 'semibold', letterSpacing: -0.3 },
  headingSmall: { fontSize: 20, lineHeight: 28, weight: 'semibold', letterSpacing: -0.2 },
  titleLarge: { fontSize: 18, lineHeight: 26, weight: 'semibold', letterSpacing: -0.1 },
  titleMedium: { fontSize: 16, lineHeight: 24, weight: 'semibold', letterSpacing: 0 },
  titleSmall: { fontSize: 14, lineHeight: 20, weight: 'semibold', letterSpacing: 0 },
  bodyLarge: { fontSize: 16, lineHeight: 24, weight: 'regular', letterSpacing: 0 },
  bodyMedium: { fontSize: 14, lineHeight: 20, weight: 'regular', letterSpacing: 0 },
  bodySmall: { fontSize: 13, lineHeight: 18, weight: 'regular', letterSpacing: 0 },
  labelLarge: { fontSize: 14, lineHeight: 20, weight: 'medium', letterSpacing: 0.1 },
  labelMedium: { fontSize: 12, lineHeight: 16, weight: 'medium', letterSpacing: 0.2 },
  labelSmall: { fontSize: 11, lineHeight: 14, weight: 'medium', letterSpacing: 0.3 },
  caption: { fontSize: 12, lineHeight: 16, weight: 'regular', letterSpacing: 0.1 },
};
