import type { ReactNode, Ref } from 'react';
import type { StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { IconName } from '../../icons/Icon/icons';
import type { ControlSize } from '../../theme/types';

export type InputSize = ControlSize;

export interface InputProps extends Omit<TextInputProps, 'style' | 'editable'> {
  label?: string;
  required?: boolean;
  helperText?: string;
  /** Error message. Switches the field to the error state. */
  error?: string;
  /** Marks the field as valid (success border). */
  success?: boolean;
  disabled?: boolean;
  /** Control size. Defaults to `md`. */
  size?: InputSize;
  leftIcon?: IconName;
  rightIcon?: IconName;
  /** Custom element rendered at the start (takes precedence over `leftIcon`). */
  leftElement?: ReactNode;
  /** Custom element rendered at the end (takes precedence over `rightIcon`). */
  rightElement?: ReactNode;
  /** Style applied to the outer wrapper (label + control + messages). */
  style?: StyleProp<ViewStyle>;
  /** Style applied to the bordered control container. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Style applied to the native `TextInput`. */
  inputStyle?: StyleProp<TextStyle>;
  ref?: Ref<TextInput>;
}
