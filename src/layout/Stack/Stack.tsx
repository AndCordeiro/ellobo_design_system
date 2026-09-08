import { Box } from '../Box/Box';
import type { StackProps } from './types';

/**
 * Vertical layout with consistent spacing between children.
 *
 * @example
 * <Stack gap="md">
 *   <Text>Um</Text>
 *   <Text>Dois</Text>
 * </Stack>
 */
export function Stack({ gap = 'md', ...rest }: StackProps) {
  return <Box direction="column" gap={gap} {...rest} />;
}
