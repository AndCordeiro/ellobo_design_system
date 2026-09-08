import type { TextStyle, ViewStyle } from 'react-native';
import type { DesignSystemTheme } from '../../theme/types';
import { getTypographyStyle } from '../../utils/styles';
import type { InputSize } from './types';

export interface InputStyleOptions {
  size: InputSize;
  focused: boolean;
  disabled: boolean;
  error: boolean;
  success: boolean;
  multiline: boolean;
}

export function getInputStyles(theme: DesignSystemTheme, options: InputStyleOptions) {
  const tokens = theme.components.input;

  const borderColor = options.disabled
    ? theme.colors.border.disabled
    : options.error
      ? tokens.errorBorderColor
      : options.success
        ? tokens.successBorderColor
        : options.focused
          ? tokens.focusBorderColor
          : tokens.borderColor;

  const container: ViewStyle = {
    flexDirection: 'row',
    alignItems: options.multiline ? 'flex-start' : 'center',
    minHeight: tokens.height[options.size],
    paddingHorizontal: tokens.paddingHorizontal,
    borderRadius: tokens.borderRadius,
    borderWidth: options.focused && !options.disabled ? tokens.borderWidth + 1 : tokens.borderWidth,
    borderColor,
    backgroundColor: options.disabled ? tokens.disabledBackground : tokens.background,
    gap: theme.spacing.sm,
  };

  const input: TextStyle = {
    ...getTypographyStyle(theme, 'bodyLarge'),
    flex: 1,
    color: options.disabled ? tokens.disabledTextColor : tokens.textColor,
    paddingVertical: options.multiline ? theme.spacing[3] : 0,
    paddingHorizontal: 0,
    margin: 0,
    textAlignVertical: options.multiline ? 'top' : 'center',
  };

  return {
    container,
    input,
    placeholderColor: tokens.placeholderColor,
    iconColor: options.disabled ? theme.colors.content.disabled : theme.colors.content.tertiary,
  };
}
