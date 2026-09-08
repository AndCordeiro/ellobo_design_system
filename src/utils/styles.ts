import type { TextStyle, ViewStyle } from 'react-native';
import type { ElevationLevel } from '../tokens/elevation';
import type { RadiusToken } from '../tokens/radius';
import type { SpacingToken } from '../tokens/spacing';
import type { FontWeightKey, TypographyVariantName } from '../tokens/typography';
import type {
  BackgroundColorToken,
  BorderColorToken,
  ContentColorToken,
  DesignSystemTheme,
  FeedbackTone,
} from '../theme/types';

/** Color tokens accepted by text-like components. */
export type TextColorToken = ContentColorToken | FeedbackTone;

export function resolveSpacing(theme: DesignSystemTheme, token: SpacingToken | undefined): number {
  return token === undefined ? 0 : theme.spacing[token];
}

export function resolveRadius(theme: DesignSystemTheme, token: RadiusToken | undefined): number {
  return token === undefined ? 0 : theme.radius[token];
}

export function resolveBackgroundColor(
  theme: DesignSystemTheme,
  token: BackgroundColorToken,
): string {
  return theme.colors.background[token];
}

export function resolveBorderColor(theme: DesignSystemTheme, token: BorderColorToken): string {
  return theme.colors.border[token];
}

export function resolveTextColor(theme: DesignSystemTheme, token: TextColorToken): string {
  switch (token) {
    case 'success':
    case 'warning':
    case 'error':
    case 'info':
      return theme.colors.feedback[token];
    default:
      return theme.colors.content[token];
  }
}

/**
 * Builds the platform style for an elevation level. Shadow color comes from the theme so dark
 * surfaces get a heavier shadow without components knowing about the mode.
 */
export function getElevationStyle(theme: DesignSystemTheme, level: ElevationLevel): ViewStyle {
  const value = theme.elevation[level];
  if (level === 'none') {
    return { elevation: 0 };
  }
  return {
    shadowColor: theme.colors.shadow,
    shadowOffset: value.shadowOffset,
    shadowOpacity: value.shadowOpacity,
    shadowRadius: value.shadowRadius,
    elevation: value.elevation,
  };
}

/**
 * Builds the text style for a typography variant. When the theme defines a font family for the
 * weight, `fontWeight` is omitted so native platforms do not synthesize a fake bold.
 */
export function getTypographyStyle(
  theme: DesignSystemTheme,
  variant: TypographyVariantName,
  weightOverride?: FontWeightKey,
): TextStyle {
  const definition = theme.typography.variants[variant];
  const weight = weightOverride ?? definition.weight;
  const fontFamily = theme.typography.fontFamily[weight];

  const style: TextStyle = {
    fontSize: definition.fontSize,
    lineHeight: definition.lineHeight,
    letterSpacing: definition.letterSpacing,
  };

  if (fontFamily) {
    style.fontFamily = fontFamily;
  } else {
    style.fontWeight = theme.typography.fontWeight[weight];
  }

  return style;
}
