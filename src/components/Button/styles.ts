import type { TextStyle, ViewStyle } from 'react-native';
import type { ButtonVariant, DesignSystemTheme } from '../../theme/types';
import type { ButtonSize } from './types';

export interface ButtonStyleOptions {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  pressed: boolean;
  fullWidth: boolean;
}

export interface ButtonStyles {
  container: ViewStyle;
  contentColor: string;
  iconSize: number;
  typography: DesignSystemTheme['components']['button']['typography'][ButtonSize];
  label: TextStyle;
}

export function getButtonStyles(
  theme: DesignSystemTheme,
  options: ButtonStyleOptions,
): ButtonStyles {
  const tokens = theme.components.button;
  const variant = tokens.variants[options.variant];
  const { disabled, pressed, size } = options;

  const backgroundColor = disabled
    ? variant.background === 'transparent'
      ? 'transparent'
      : theme.colors.action.disabled
    : pressed
      ? variant.pressedBackground
      : variant.background;

  const borderColor =
    disabled && variant.borderWidth > 0 ? theme.colors.border.disabled : variant.borderColor;

  const contentColor = disabled ? theme.colors.action.disabledContent : variant.content;

  return {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: tokens.height[size],
      paddingHorizontal: tokens.paddingHorizontal[size],
      borderRadius: tokens.borderRadius,
      borderWidth: variant.borderWidth,
      borderColor,
      backgroundColor,
      gap: theme.spacing.sm,
      alignSelf: options.fullWidth ? 'stretch' : 'flex-start',
      width: options.fullWidth ? '100%' : undefined,
    },
    contentColor,
    iconSize: tokens.iconSize[size],
    typography: tokens.typography[size],
    label: { color: contentColor },
  };
}
