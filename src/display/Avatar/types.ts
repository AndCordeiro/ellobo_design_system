import type { ImageSourcePropType, ViewProps } from 'react-native';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends ViewProps {
  /** Image source. When it fails to load, the fallback is displayed. */
  source?: ImageSourcePropType;
  /** Full name used to derive initials and the accessibility label. */
  name?: string;
  /** Explicit initials (max 2 characters recommended). Takes precedence over `name`. */
  fallback?: string;
  /** Size token. Defaults to `md` (40). */
  size?: AvatarSize;
  /** `circle` (default) or `rounded`. */
  shape?: 'circle' | 'rounded';
}
