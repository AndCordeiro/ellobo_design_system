import type { ReactNode, Ref } from 'react';
import type { PressableProps, StyleProp, View, ViewStyle } from 'react-native';

export interface CheckboxProps extends Omit<
  PressableProps,
  'children' | 'style' | 'disabled' | 'onPress' | 'ref'
> {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  /** Label rendered next to the box. Pressing it toggles the checkbox. */
  label?: ReactNode;
  /** Secondary text rendered under the label. */
  description?: string;
  disabled?: boolean;
  /** Renders the mixed state (e.g. a parent of partially selected items). */
  indeterminate?: boolean;
  /** Error state: draws the box with the error border color. */
  error?: boolean;
  style?: StyleProp<ViewStyle>;
  ref?: Ref<View>;
}
