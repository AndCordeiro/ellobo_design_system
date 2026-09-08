import {
  ActivityIndicator as RNActivityIndicator,
  type ActivityIndicatorProps as RNActivityIndicatorProps,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { resolveTextColor, type TextColorToken } from '../../utils/styles';

export type ActivityIndicatorSize = 'sm' | 'md' | 'lg';

/** Semantic color token or a raw color string (used internally to match button content). */
export type ActivityIndicatorColor = TextColorToken | (string & {});

export interface ActivityIndicatorProps extends Omit<RNActivityIndicatorProps, 'size' | 'color'> {
  /** `sm` and `md` map to the native small spinner, `lg` to the large one. Defaults to `md`. */
  size?: ActivityIndicatorSize | number;
  /** Semantic color token. Defaults to `brand`. */
  color?: ActivityIndicatorColor;
}

const colorTokens = new Set<string>([
  'primary',
  'secondary',
  'tertiary',
  'disabled',
  'inverse',
  'brand',
  'success',
  'warning',
  'error',
  'info',
]);

function isColorToken(value: string): value is TextColorToken {
  return colorTokens.has(value);
}

const nativeSize: Record<ActivityIndicatorSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
};

/**
 * Themed spinner.
 */
export function ActivityIndicator({
  size = 'md',
  color = 'brand',
  accessibilityLabel = 'Carregando',
  ...rest
}: ActivityIndicatorProps) {
  const theme = useTheme();
  return (
    <RNActivityIndicator
      size={typeof size === 'number' ? size : nativeSize[size]}
      color={isColorToken(color) ? resolveTextColor(theme, color) : color}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      {...rest}
    />
  );
}
