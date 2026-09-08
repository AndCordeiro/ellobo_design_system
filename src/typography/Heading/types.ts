import type { TextProps } from '../Text/types';

export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface HeadingProps extends Omit<TextProps, 'variant'> {
  /** Visual size. Maps to the heading/display typography variants. Defaults to `md`. */
  size?: HeadingSize;
}
