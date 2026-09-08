import { useTheme } from '../../theme/useTheme';
import { Input } from '../Input/Input';
import type { InputProps } from '../Input/types';

export interface TextAreaProps extends Omit<InputProps, 'multiline' | 'numberOfLines' | 'size'> {
  /** Visible rows used to compute the minimum height. Defaults to 4. */
  rows?: number;
}

/**
 * Multiline text field consistent with `Input`.
 *
 * @example
 * <TextArea label="Observações" rows={5} value={notes} onChangeText={setNotes} />
 */
export function TextArea({ rows = 4, containerStyle, inputStyle, ...rest }: TextAreaProps) {
  const theme = useTheme();
  const lineHeight = theme.typography.variants.bodyLarge.lineHeight;
  const minHeight = rows * lineHeight + theme.spacing[3] * 2;

  return (
    <Input
      multiline
      numberOfLines={rows}
      containerStyle={[{ minHeight }, containerStyle]}
      inputStyle={[{ minHeight: minHeight - 2 }, inputStyle]}
      {...rest}
    />
  );
}
