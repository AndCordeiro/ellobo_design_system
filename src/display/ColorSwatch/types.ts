import type { StyleProp, ViewStyle } from 'react-native';

export type ColorSwatchSize = 'sm' | 'md' | 'lg';

export interface ColorSwatchProps {
  color: string;
  accessibilityLabel: string;
  selected?: boolean;
  onPress?: () => void;
  size?: ColorSwatchSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
