import type { ReactNode, Ref } from 'react';
import type { View, ViewProps } from 'react-native';
import type { RadiusToken } from '../../tokens/radius';
import type { SpacingToken } from '../../tokens/spacing';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends ViewProps {
  /** Visual variant. Defaults to `elevated`. */
  variant?: CardVariant;
  /** Inner padding token. Defaults to the card component token (16). */
  padding?: SpacingToken;
  /** Corner radius token. Defaults to the card component token. */
  borderRadius?: RadiusToken;
  children?: ReactNode;
  ref?: Ref<View>;
}
