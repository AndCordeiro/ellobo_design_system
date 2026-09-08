import { View } from 'react-native';
import type { SpacingToken } from '../../tokens/spacing';
import { useTheme } from '../../theme/useTheme';

export interface SpacerProps {
  /** Spacing token. Defaults to `md`. Ignored when `flex` is set. */
  size?: SpacingToken;
  /** Axis on which the space is applied. Defaults to `vertical`. */
  axis?: 'vertical' | 'horizontal';
  /** Expands to fill the remaining space instead of a fixed size. */
  flex?: boolean;
  testID?: string;
}

/**
 * Empty space controlled by spacing tokens. Prefer `gap` on `Stack`/`Row` for regular rhythm and
 * `Spacer` for one-off gaps or to push content apart with `flex`.
 */
export function Spacer({ size = 'md', axis = 'vertical', flex = false, testID }: SpacerProps) {
  const theme = useTheme();

  if (flex) {
    return <View testID={testID} style={{ flex: 1 }} />;
  }

  const value = theme.spacing[size];
  return (
    <View
      testID={testID}
      style={axis === 'vertical' ? { height: value } : { width: value }}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}
