import { Text } from '../../typography/Text/Text';
import type { TextProps } from '../../typography/Text/types';

export interface FormLabelProps extends Omit<TextProps, 'variant'> {
  /** Appends a required marker. */
  required?: boolean;
  disabled?: boolean;
  /** Accessible text announced for the required marker. */
  requiredLabel?: string;
}

/**
 * Label for a form control.
 */
export function FormLabel({
  required = false,
  disabled = false,
  requiredLabel = 'obrigatório',
  children,
  color,
  ...rest
}: FormLabelProps) {
  return (
    <Text variant="labelLarge" color={color ?? (disabled ? 'disabled' : 'primary')} {...rest}>
      {children}
      {required ? (
        <Text variant="labelLarge" color="error" accessibilityLabel={requiredLabel}>
          {' *'}
        </Text>
      ) : null}
    </Text>
  );
}
