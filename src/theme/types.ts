import type { ElevationLevel, ElevationValue } from '../tokens/elevation';
import type { MotionDurationToken } from '../tokens/motion';
import type { OpacityToken } from '../tokens/opacity';
import type { RadiusToken } from '../tokens/radius';
import type { SpacingScaleKey, SpacingToken } from '../tokens/spacing';
import type {
  FontWeightKey,
  FontWeightValue,
  TypographyVariant,
  TypographyVariantName,
} from '../tokens/typography';

export type ThemeMode = 'light' | 'dark';

/* ------------------------------------------------------------------------------------------ */
/* Colors                                                                                     */
/* ------------------------------------------------------------------------------------------ */

export interface BrandColors {
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface BackgroundColors {
  primary: string;
  secondary: string;
  tertiary: string;
  elevated: string;
  inverse: string;
  overlay: string;
  brandSubtle: string;
}

export interface ContentColors {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled: string;
  inverse: string;
  brand: string;
}

export interface BorderColors {
  primary: string;
  secondary: string;
  strong: string;
  focus: string;
  disabled: string;
}

export interface ActionColors {
  primary: string;
  primaryContent: string;
  primaryPressed: string;

  secondary: string;
  secondaryContent: string;
  secondaryPressed: string;

  danger: string;
  dangerContent: string;
  dangerPressed: string;

  disabled: string;
  disabledContent: string;
}

export interface FeedbackColors {
  success: string;
  successBackground: string;
  successContent: string;

  warning: string;
  warningBackground: string;
  warningContent: string;

  error: string;
  errorBackground: string;
  errorContent: string;

  info: string;
  infoBackground: string;
  infoContent: string;
}

export interface ThemeColors {
  brand: BrandColors;
  background: BackgroundColors;
  content: ContentColors;
  border: BorderColors;
  action: ActionColors;
  feedback: FeedbackColors;
  /** Base color used by elevation shadows. */
  shadow: string;
}

export type BackgroundColorToken = keyof BackgroundColors;
export type ContentColorToken = keyof ContentColors;
export type BorderColorToken = keyof BorderColors;
export type FeedbackTone = 'success' | 'warning' | 'error' | 'info';

/* ------------------------------------------------------------------------------------------ */
/* Typography                                                                                 */
/* ------------------------------------------------------------------------------------------ */

/**
 * Font family names as registered in the consuming app (e.g. `Inter-SemiBold`).
 * When a value is `undefined`, the platform system font is used together with `fontWeight`.
 */
export type FontFamilyTokens = Partial<Record<FontWeightKey, string>>;

export interface ThemeTypography {
  fontFamily: FontFamilyTokens;
  fontWeight: Record<FontWeightKey, FontWeightValue>;
  variants: Record<TypographyVariantName, TypographyVariant>;
}

/* ------------------------------------------------------------------------------------------ */
/* Scales                                                                                     */
/* ------------------------------------------------------------------------------------------ */

export type ThemeSpacing = Record<SpacingScaleKey, number> & Record<SpacingToken, number>;
export type ThemeRadius = Record<RadiusToken, number>;
export type ThemeElevation = Record<ElevationLevel, ElevationValue>;
export type ThemeOpacity = Record<OpacityToken, number>;
export interface ThemeMotion {
  duration: Record<MotionDurationToken, number>;
}

/* ------------------------------------------------------------------------------------------ */
/* Component tokens                                                                           */
/* ------------------------------------------------------------------------------------------ */

export type ControlSize = 'sm' | 'md' | 'lg';

export interface ButtonVariantTokens {
  background: string;
  content: string;
  pressedBackground: string;
  borderColor: string;
  borderWidth: number;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface ButtonTokens {
  height: Record<ControlSize, number>;
  paddingHorizontal: Record<ControlSize, number>;
  iconSize: Record<ControlSize, number>;
  typography: Record<ControlSize, TypographyVariantName>;
  borderRadius: number;
  variants: Record<ButtonVariant, ButtonVariantTokens>;
}

export interface InputTokens {
  height: Record<ControlSize, number>;
  paddingHorizontal: number;
  borderRadius: number;
  borderWidth: number;
  background: string;
  disabledBackground: string;
  borderColor: string;
  focusBorderColor: string;
  errorBorderColor: string;
  successBorderColor: string;
  placeholderColor: string;
  textColor: string;
  disabledTextColor: string;
}

export interface CardTokens {
  borderRadius: number;
  padding: number;
  background: string;
  outlinedBorderColor: string;
  filledBackground: string;
  elevation: ElevationLevel;
}

export interface ThemeComponents {
  button: ButtonTokens;
  input: InputTokens;
  card: CardTokens;
}

/* ------------------------------------------------------------------------------------------ */
/* Theme                                                                                      */
/* ------------------------------------------------------------------------------------------ */

export interface DesignSystemTheme {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  elevation: ThemeElevation;
  opacity: ThemeOpacity;
  motion: ThemeMotion;
  components: ThemeComponents;
}

/**
 * Recursively optional version of a type. Used by `createTheme` to accept partial overrides.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[] ? U[] : T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * Partial theme accepted by `createTheme`. Every value is optional and is deep-merged over the
 * base theme.
 */
export type ThemeOverrides = DeepPartial<DesignSystemTheme>;
