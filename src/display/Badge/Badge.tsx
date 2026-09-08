import type { ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { DesignSystemTheme } from '../../theme/types';
import { Text } from '../../typography/Text/Text';

export type BadgeVariant = 'brand' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends ViewProps {
  /** Text or number displayed. Numbers above `max` are shown as `max+`. */
  children?: ReactNode;
  /** Color variant. Defaults to `brand`. */
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Upper bound for numeric content. Defaults to 99. */
  max?: number;
  /** Renders a small dot without content. */
  dot?: boolean;
}

export function getBadgeColors(theme: DesignSystemTheme, variant: BadgeVariant) {
  switch (variant) {
    case 'neutral':
      return {
        background: theme.colors.background.tertiary,
        content: theme.colors.content.primary,
      };
    case 'brand':
      return {
        background: theme.colors.action.primary,
        content: theme.colors.action.primaryContent,
      };
    default:
      return { background: theme.colors.feedback[variant], content: theme.colors.content.inverse };
  }
}

/**
 * Compact indicator for counts and short statuses.
 *
 * @example
 * <Badge>3</Badge>
 * <Badge variant="error">Erro</Badge>
 */
export function Badge({
  children,
  variant = 'brand',
  size = 'md',
  max = 99,
  dot = false,
  style,
  accessibilityLabel,
  ...rest
}: BadgeProps) {
  const theme = useTheme();
  const colors = getBadgeColors(theme, variant);

  const content =
    typeof children === 'number' ? (children > max ? `${max}+` : String(children)) : children;

  const minSize = dot ? 8 : size === 'sm' ? 16 : 20;

  const containerStyle: ViewStyle = {
    minWidth: minSize,
    height: minSize,
    paddingHorizontal: dot ? 0 : size === 'sm' ? theme.spacing.xs : theme.spacing[2] - 2,
    borderRadius: theme.radius.full,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  };

  return (
    <View
      accessible={Boolean(accessibilityLabel) || typeof content === 'string'}
      accessibilityLabel={accessibilityLabel ?? (typeof content === 'string' ? content : undefined)}
      style={[containerStyle, style]}
      {...rest}
    >
      {dot ? null : typeof content === 'string' ? (
        <Text
          variant={size === 'sm' ? 'labelSmall' : 'labelMedium'}
          weight="semibold"
          style={{ color: colors.content }}
          allowFontScaling={false}
        >
          {content}
        </Text>
      ) : (
        content
      )}
    </View>
  );
}
