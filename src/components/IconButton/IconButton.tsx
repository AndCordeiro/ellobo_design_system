import { useCallback } from 'react';
import { Pressable, type PressableStateCallbackType, type ViewStyle } from 'react-native';
import { ActivityIndicator } from '../../feedback/ActivityIndicator/ActivityIndicator';
import { Icon } from '../../icons/Icon/Icon';
import { useTheme } from '../../theme/useTheme';
import { getButtonStyles } from '../Button/styles';
import type { IconButtonProps, IconButtonSize } from './types';

const dimensions: Record<IconButtonSize, number> = { sm: 32, md: 40, lg: 48 };
const iconSizes: Record<IconButtonSize, number> = { sm: 16, md: 20, lg: 24 };

/**
 * Icon-only button. Always requires an `accessibilityLabel`.
 *
 * @example
 * <IconButton icon="settings" accessibilityLabel="Configurações" onPress={openSettings} />
 */
export function IconButton({
  icon,
  accessibilityLabel,
  variant = 'ghost',
  size = 'md',
  shape = 'circle',
  loading = false,
  disabled = false,
  style,
  accessibilityState,
  hitSlop,
  onPress,
  ref,
  ...rest
}: IconButtonProps) {
  const theme = useTheme();
  const isInteractionBlocked = disabled || loading;
  const dimension = dimensions[size];

  const resolveStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => {
      const resolved = getButtonStyles(theme, {
        variant,
        size,
        disabled,
        pressed: pressed && !isInteractionBlocked,
        fullWidth: false,
      });
      const shapeStyle: ViewStyle = {
        width: dimension,
        height: dimension,
        minHeight: dimension,
        paddingHorizontal: 0,
        borderRadius: shape === 'circle' ? theme.radius.full : theme.components.button.borderRadius,
      };
      return [resolved.container, shapeStyle, style];
    },
    [theme, variant, size, disabled, isInteractionBlocked, dimension, shape, style],
  );

  const contentColor = getButtonStyles(theme, {
    variant,
    size,
    disabled,
    pressed: false,
    fullWidth: false,
  }).contentColor;

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isInteractionBlocked, busy: loading, ...accessibilityState }}
      disabled={isInteractionBlocked}
      hitSlop={hitSlop ?? (size === 'sm' ? 8 : 4)}
      onPress={isInteractionBlocked ? undefined : onPress}
      style={resolveStyle}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="sm" color={contentColor} />
      ) : (
        <Icon name={icon} size={iconSizes[size]} color={contentColor} />
      )}
    </Pressable>
  );
}
