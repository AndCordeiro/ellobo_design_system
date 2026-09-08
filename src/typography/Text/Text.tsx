import { StyledText } from './styles';
import type { TextProps } from './types';

/**
 * Themed text primitive. Every piece of text in the system should render through `Text` so
 * typography, color and font scaling stay consistent.
 *
 * @example
 * <Text variant="bodyMedium" color="secondary">Acesse sua conta.</Text>
 */
export function Text({
  variant = 'bodyMedium',
  color = 'primary',
  weight,
  align,
  ref,
  ...rest
}: TextProps) {
  return (
    <StyledText
      ref={ref}
      $variant={variant}
      $color={color}
      $weight={weight}
      $align={align}
      {...rest}
    />
  );
}
