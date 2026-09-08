import type { ReactNode, Ref } from 'react';
import type { PressableProps, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import type { IconName } from '../../icons/Icon/icons';
import type { ButtonVariant, ControlSize } from '../../theme/types';

export type ButtonSize = ControlSize;

export interface ButtonProps extends Omit<
  PressableProps,
  'children' | 'style' | 'disabled' | 'ref'
> {
  /** Label of the button. Strings are preferred so the accessibility label is derived. */
  children: ReactNode;
  /** Visual variant. Defaults to `primary`. */
  variant?: ButtonVariant;
  /** Control size. Defaults to `md`. */
  size?: ButtonSize;
  /** Icon rendered before the label. */
  leftIcon?: IconName;
  /** Icon rendered after the label. */
  rightIcon?: IconName;
  /** Shows a spinner, keeps the dimensions and blocks interaction. */
  loading?: boolean;
  disabled?: boolean;
  /** Stretches the button to the width of its container. */
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  ref?: Ref<View>;
}
