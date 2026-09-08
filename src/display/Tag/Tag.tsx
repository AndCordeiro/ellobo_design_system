import type { ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { Icon } from '../../icons/Icon/Icon';
import type { IconName } from '../../icons/Icon/icons';
import { useTheme } from '../../theme/useTheme';
import type { DesignSystemTheme } from '../../theme/types';
import { Text } from '../../typography/Text/Text';

export type TagVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
export type TagSize = 'sm' | 'md';

export interface TagProps extends ViewProps {
  children: ReactNode;
  /** Subtle color variant. Defaults to `neutral`. */
  variant?: TagVariant;
  size?: TagSize;
  leftIcon?: IconName;
}

export function getTagColors(theme: DesignSystemTheme, variant: TagVariant) {
  switch (variant) {
    case 'neutral':
      return {
        background: theme.colors.background.tertiary,
        content: theme.colors.content.secondary,
      };
    case 'brand':
      return {
        background: theme.colors.background.brandSubtle,
        content: theme.colors.content.brand,
      };
    default:
      return {
        background: theme.colors.feedback[`${variant}Background`],
        content: theme.colors.feedback[`${variant}Content`],
      };
  }
}

/**
 * Non-interactive label used to categorize content. For selectable/removable items use `Chip`.
 *
 * @example
 * <Tag variant="success" leftIcon="check">Pago</Tag>
 */
export function Tag({
  children,
  variant = 'neutral',
  size = 'md',
  leftIcon,
  style,
  ...rest
}: TagProps) {
  const theme = useTheme();
  const colors = getTagColors(theme, variant);

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: size === 'sm' ? theme.spacing[2] : theme.spacing[3] - 2,
    height: size === 'sm' ? 22 : 26,
    borderRadius: theme.radius.sm,
    backgroundColor: colors.background,
    alignSelf: 'flex-start',
  };

  return (
    <View style={[containerStyle, style]} {...rest}>
      {leftIcon ? (
        <Icon name={leftIcon} size={size === 'sm' ? 12 : 14} color={colors.content} />
      ) : null}
      {typeof children === 'string' ? (
        <Text
          variant={size === 'sm' ? 'labelSmall' : 'labelMedium'}
          style={{ color: colors.content }}
          numberOfLines={1}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
