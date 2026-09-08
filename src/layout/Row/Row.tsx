import { Box } from '../Box/Box';
import type { BoxProps } from '../Box/types';

export interface RowProps extends Omit<BoxProps, 'direction'> {
  /** Space between children. Defaults to `sm`. */
  gap?: BoxProps['gap'];
}

/**
 * Horizontal layout with consistent spacing between children.
 *
 * @example
 * <Row gap="sm" align="center">
 *   <Icon name="star" />
 *   <Text>Favorito</Text>
 * </Row>
 */
export function Row({ gap = 'sm', ...rest }: RowProps) {
  return <Box direction="row" gap={gap} {...rest} />;
}
