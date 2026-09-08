import type { BoxProps } from '../Box/types';

export interface StackProps extends Omit<BoxProps, 'direction'> {
  /** Space between children. Defaults to `md`. */
  gap?: BoxProps['gap'];
}
