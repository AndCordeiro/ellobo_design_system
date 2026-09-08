import type { ViewStyle } from 'react-native';
import type { RadiusToken } from '../../tokens/radius';
import type { SpacingToken } from '../../tokens/spacing';
import type { DesignSystemTheme } from '../../theme/types';
import { getElevationStyle } from '../../utils/styles';
import type { CardVariant } from './types';

export function getCardStyle(
  theme: DesignSystemTheme,
  variant: CardVariant,
  padding?: SpacingToken,
  borderRadius?: RadiusToken,
): ViewStyle {
  const tokens = theme.components.card;
  const base: ViewStyle = {
    borderRadius: borderRadius ? theme.radius[borderRadius] : tokens.borderRadius,
    padding: padding ? theme.spacing[padding] : tokens.padding,
  };

  switch (variant) {
    case 'outlined':
      return {
        ...base,
        backgroundColor: tokens.background,
        borderWidth: 1,
        borderColor: tokens.outlinedBorderColor,
      };
    case 'filled':
      return { ...base, backgroundColor: tokens.filledBackground };
    case 'elevated':
    default:
      return {
        ...base,
        backgroundColor: tokens.background,
        ...getElevationStyle(theme, tokens.elevation),
      };
  }
}
