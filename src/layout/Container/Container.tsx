import { Box } from '../Box/Box';
import type { BoxProps } from '../Box/types';

export interface ContainerProps extends BoxProps {
  /** Maximum content width in pixels. Defaults to 640. */
  maxWidth?: number;
}

/**
 * Constrains content width and applies horizontal padding, keeping layouts readable on large
 * phones and tablets. Centered inside its parent.
 */
export function Container({
  maxWidth = 640,
  paddingHorizontal = 'md',
  style,
  ...rest
}: ContainerProps) {
  return (
    <Box
      width="100%"
      alignSelf="center"
      paddingHorizontal={paddingHorizontal}
      style={[{ maxWidth }, style]}
      {...rest}
    />
  );
}
