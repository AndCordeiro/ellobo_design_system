import type { TypographyVariantName } from '../../tokens/typography';
import { Text } from '../Text/Text';
import type { HeadingProps, HeadingSize } from './types';

const variantBySize: Record<HeadingSize, TypographyVariantName> = {
  sm: 'headingSmall',
  md: 'headingMedium',
  lg: 'headingLarge',
  xl: 'displayMedium',
  '2xl': 'displayLarge',
};

/**
 * Semantic heading. Announced as a header by screen readers.
 *
 * @example
 * <Heading size="lg">Entrar</Heading>
 */
export function Heading({ size = 'md', ...rest }: HeadingProps) {
  return <Text accessibilityRole="header" variant={variantBySize[size]} {...rest} />;
}
