import type { ReactNode, Ref } from 'react';
import type { PressableProps, StyleProp, View, ViewStyle } from 'react-native';

export interface RadioProps extends Omit<
  PressableProps,
  'children' | 'style' | 'disabled' | 'onPress' | 'ref'
> {
  /** Value represented by this option (used inside `RadioGroup`). */
  value: string;
  label?: ReactNode;
  description?: string;
  disabled?: boolean;
  /** Controlled selection when used outside of `RadioGroup`. */
  selected?: boolean;
  /** Selection handler when used outside of `RadioGroup`. */
  onSelect?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  ref?: Ref<View>;
}

export interface RadioOption<T extends string> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string> {
  value: T | null;
  onChange: (value: T) => void;
  /** Declarative options. When omitted, render `<Radio />` children. */
  options?: ReadonlyArray<RadioOption<T>>;
  children?: ReactNode;
  disabled?: boolean;
  /** Layout direction. Defaults to `column`. */
  direction?: 'row' | 'column';
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
