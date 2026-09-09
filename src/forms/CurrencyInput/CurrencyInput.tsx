import { useCallback, useMemo, useState } from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Input } from '../Input/Input';
import { currencySymbol, digitsToMinorUnits, formatMinorUnits } from './currency';
import { getSymbolStyle } from './styles';
import type { CurrencyInputProps } from './types';

/**
 * Money field with a locale-aware mask. The user only types digits; the field renders them as a
 * localized amount (`59,90`, `12,345.67`, `1,234`) and reports integers in the minor unit.
 *
 * @example
 * <CurrencyInput label="Valor" value={cents} onChange={setCents} currency="BRL" locale="pt-BR" />
 * <CurrencyInput label="Amount" value={cents} onChange={setCents} currency="USD" locale="en-US" />
 */
export function CurrencyInput({
  value,
  onChange,
  currency = 'BRL',
  locale = 'pt-BR',
  showSymbol = true,
  placeholder,
  disabled = false,
  accessibilityLabel,
  ...inputProps
}: CurrencyInputProps) {
  const theme = useTheme();
  const format = useCallback(
    (minor: number | null) => (minor === null ? '' : formatMinorUnits(minor, currency, locale)),
    [currency, locale],
  );
  const [text, setText] = useState(() => format(value));
  const [syncedValue, setSyncedValue] = useState(value);
  if (value !== syncedValue) {
    setSyncedValue(value);
    setText(format(value));
  }

  const handleChangeText = useCallback(
    (next: string) => {
      const minor = digitsToMinorUnits(next);
      setSyncedValue(minor);
      setText(format(minor));
      onChange(minor);
    },
    [format, onChange],
  );

  const symbol = useMemo(() => currencySymbol(currency, locale), [currency, locale]);
  const symbolStyle = useMemo(() => getSymbolStyle(theme, disabled), [theme, disabled]);

  return (
    <Input
      {...inputProps}
      disabled={disabled}
      value={text}
      onChangeText={handleChangeText}
      keyboardType="number-pad"
      placeholder={placeholder ?? format(0)}
      accessibilityLabel={accessibilityLabel ?? inputProps.label}
      leftElement={showSymbol ? <RNText style={symbolStyle}>{symbol}</RNText> : undefined}
    />
  );
}
