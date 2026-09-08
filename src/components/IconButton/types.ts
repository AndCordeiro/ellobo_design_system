import type { Ref } from 'react';
import type { PressableProps, StyleProp, View, ViewStyle } from 'react-native';
import type { IconName } from '../../icons/Icon/icons';
import type { ButtonVariant, ControlSize } from '../../theme/types';

export type IconButtonSize = ControlSize;

export interface IconButtonProps extends Omit<
  PressableProps,
  'children' | 'style' | 'disabled' | 'ref' | 'accessibilityLabel'
> {
  icon: IconName;
  /** Required: icon-only controls must describe their action to screen readers. */
  accessibilityLabel: string;
  /** Visual variant, coherent with `Button`. Defaults to `ghost`. */
  variant?: ButtonVariant;
  /** Same heights as `Button` (`theme.components.button.height`). Defaults to `md`. */
  size?: IconButtonSize;
  /** `circle` (default) or `rounded` (uses the button radius token). */
  shape?: 'circle' | 'rounded';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  ref?: Ref<View>;
}
