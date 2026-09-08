import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { FormError } from '../FormError/FormError';
import { FormHelperText } from '../FormHelperText/FormHelperText';
import { FormLabel } from '../FormLabel/FormLabel';

export interface FormFieldProps extends ViewProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  /** Helper text shown when there is no error. */
  helperText?: string;
  /** Error message. When present it replaces the helper text. */
  error?: string;
  /** The form control. */
  children: ReactNode;
}

/**
 * Composes label, control, helper text and error message with consistent spacing.
 *
 * @example
 * <FormField label="CPF" helperText="Somente números">
 *   <Input value={cpf} onChangeText={setCpf} keyboardType="number-pad" />
 * </FormField>
 */
export function FormField({
  label,
  required,
  disabled,
  helperText,
  error,
  children,
  style,
  ...rest
}: FormFieldProps) {
  const theme = useTheme();

  return (
    <View style={[{ gap: theme.spacing.xs }, style]} {...rest}>
      {label ? (
        <FormLabel required={required} disabled={disabled}>
          {label}
        </FormLabel>
      ) : null}
      {children}
      {error ? (
        <FormError>{error}</FormError>
      ) : helperText ? (
        <FormHelperText color={disabled ? 'disabled' : 'secondary'}>{helperText}</FormHelperText>
      ) : null}
    </View>
  );
}
