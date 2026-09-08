import type { ReactNode, Ref } from 'react';
import type { View, ViewProps } from 'react-native';
import type { ElevationLevel } from '../../tokens/elevation';
import type { RadiusToken } from '../../tokens/radius';
import type { SpacingToken } from '../../tokens/spacing';

export type SurfaceBackground = 'primary' | 'secondary' | 'tertiary' | 'elevated';

export interface SurfaceProps extends ViewProps {
  /** Elevation level. Defaults to `none`. */
  elevation?: ElevationLevel;
  /** Background token. Defaults to `elevated`. */
  background?: SurfaceBackground;
  /** Corner radius token. Defaults to `lg`. */
  borderRadius?: RadiusToken;
  /** Inner padding token. Defaults to `none`. */
  padding?: SpacingToken;
  /** Draws a 1px border using `border.primary`. */
  bordered?: boolean;
  children?: ReactNode;
  ref?: Ref<View>;
}
