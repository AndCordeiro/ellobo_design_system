import type { InputProps } from '../Input/types';

export interface CurrencyInputProps extends Omit<
  InputProps,
  'value' | 'onChange' | 'onChangeText' | 'keyboardType' | 'leftElement' | 'defaultValue'
> {
  /** Amount in the currency's minor unit (cents), or `null` while empty. Never a float. */
  value: number | null;
  onChange: (minorUnits: number | null) => void;
  /** ISO 4217 code. Defaults to `BRL`. */
  currency?: string;
  /** BCP 47 locale that drives separators and symbol. Defaults to `pt-BR`. */
  locale?: string;
  /** Shows the currency symbol before the amount. Defaults to `true`. */
  showSymbol?: boolean;
}
