import { Box } from '../Box/Box';
import type { BoxProps } from '../Box/types';

export interface CenterProps extends Omit<BoxProps, 'align' | 'justify'> {
  /** Expands to fill the available space (`flex: 1`). */
  fill?: boolean;
}

/**
 * Centers its children on both axes.
 */
export function Center({ fill = false, flex, ...rest }: CenterProps) {
  return <Box align="center" justify="center" flex={fill ? 1 : flex} {...rest} />;
}
