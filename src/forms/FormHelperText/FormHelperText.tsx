import { Text } from '../../typography/Text/Text';
import type { TextProps } from '../../typography/Text/types';

export type FormHelperTextProps = Omit<TextProps, 'variant'>;

/**
 * Secondary guidance displayed under a form control.
 */
export function FormHelperText({ color = 'secondary', ...rest }: FormHelperTextProps) {
  return <Text variant="bodySmall" color={color} {...rest} />;
}
