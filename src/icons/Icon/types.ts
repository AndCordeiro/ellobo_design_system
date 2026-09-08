import type { SvgProps } from 'react-native-svg';
import type { TextColorToken } from '../../utils/styles';
import type { IconName } from './icons';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Semantic color token or a raw color string. Components inside the library always pass tokens;
 * raw values exist so consumers can match icons to custom surfaces when needed.
 */
export type IconColor = TextColorToken | (string & {});

export interface IconProps extends Omit<SvgProps, 'color' | 'width' | 'height' | 'children'> {
  /** Strongly-typed icon name. */
  name: IconName;
  /** Size token or an explicit pixel value. Defaults to `md` (20). */
  size?: IconSize | number;
  /** Color token (`primary`, `secondary`, `brand`, `error`…) or a raw color. Defaults to `primary`. */
  color?: IconColor;
  /** Stroke width on the 24pt grid. Defaults to 2. */
  strokeWidth?: number;
  /**
   * When provided, the icon is exposed to assistive technologies as an image with this label.
   * Without it, the icon is decorative and hidden from screen readers.
   */
  accessibilityLabel?: string;
}
