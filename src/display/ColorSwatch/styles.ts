import { StyleSheet, type ViewStyle } from 'react-native';
import type { DesignSystemTheme } from '../../theme/types';
import type { ColorSwatchSize } from './types';

const RING_WIDTH = 2;
const MIN_TOUCH_TARGET = 44;

interface ColorSwatchStyleOptions {
  color: string;
  size: ColorSwatchSize;
  selected: boolean;
  disabled: boolean;
}

export interface ColorSwatchStyles {
  container: ViewStyle;
  fill: ViewStyle;
  fillPressed: ViewStyle;
  hitSlop: number;
}

export function getColorSwatchDimension(theme: DesignSystemTheme, size: ColorSwatchSize): number {
  const dimensions: Record<ColorSwatchSize, number> = {
    sm: theme.spacing[6],
    md: theme.spacing[8],
    lg: theme.spacing[10],
  };
  return dimensions[size];
}

export function getColorSwatchStyles(
  theme: DesignSystemTheme,
  { color, size, selected, disabled }: ColorSwatchStyleOptions,
): ColorSwatchStyles {
  const dimension = getColorSwatchDimension(theme, size);
  const ringGap = theme.spacing.xs;
  const outerSize = dimension + 2 * (ringGap + RING_WIDTH);

  const container: ViewStyle = {
    width: outerSize,
    height: outerSize,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? theme.opacity.disabled : 1,
    ...(selected ? { borderWidth: RING_WIDTH, borderColor: theme.colors.border.focus } : {}),
  };

  const fill: ViewStyle = {
    width: dimension,
    height: dimension,
    borderRadius: theme.radius.full,
    backgroundColor: color,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.strong,
  };

  return {
    container,
    fill,
    fillPressed: { ...fill, opacity: theme.opacity.pressed },
    hitSlop: Math.max(0, Math.ceil((MIN_TOUCH_TARGET - outerSize) / 2)),
  };
}
