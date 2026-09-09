import { useState } from 'react';
import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { CurrencyInput } from './CurrencyInput';
import type { CurrencyInputProps } from './types';

type HarnessProps = Omit<CurrencyInputProps, 'value' | 'onChange'> & {
  initialValue?: number | null;
  onChange?: (value: number | null) => void;
};

/** Realistic controlled usage: the parent stores the value the field reports. */
function Harness({ initialValue = null, onChange, ...props }: HarnessProps) {
  const [value, setValue] = useState<number | null>(initialValue);
  return (
    <CurrencyInput
      {...props}
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
    />
  );
}

describe('CurrencyInput', () => {
  it('shows the symbol and masks typed digits as BRL', () => {
    const onChange = jest.fn();
    renderWithTheme(<Harness label="Valor" onChange={onChange} testID="amount" />);

    expect(screen.getByText('R$')).toBeOnTheScreen();
    expect(screen.getByTestId('amount').props.placeholder).toBe('0,00');
    fireEvent.changeText(screen.getByTestId('amount'), '5990');
    expect(onChange).toHaveBeenLastCalledWith(5990);
    expect(screen.getByTestId('amount').props.value).toBe('59,90');
    fireEvent.changeText(screen.getByTestId('amount'), '59,905');
    expect(onChange).toHaveBeenLastCalledWith(59905);
    expect(screen.getByTestId('amount').props.value).toBe('599,05');
  });

  it('works for other currencies and locales', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <Harness label="Amount" onChange={onChange} currency="USD" locale="en-US" testID="amount" />,
    );
    expect(screen.getByText('$')).toBeOnTheScreen();
    fireEvent.changeText(screen.getByTestId('amount'), '1234567');
    expect(onChange).toHaveBeenLastCalledWith(1234567);
    expect(screen.getByTestId('amount').props.value).toBe('12,345.67');
  });

  it('handles zero-decimal currencies and clearing', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <Harness
        label="金額"
        initialValue={1234}
        onChange={onChange}
        currency="JPY"
        locale="ja-JP"
        testID="amount"
      />,
    );
    expect(screen.getByTestId('amount').props.value).toBe('1,234');
    fireEvent.changeText(screen.getByTestId('amount'), '');
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByTestId('amount').props.value).toBe('');
  });

  it('follows external value changes (form reset, edit mode)', () => {
    const { rerender } = renderWithTheme(
      <CurrencyInput label="Valor" value={100} onChange={jest.fn()} testID="amount" />,
    );
    expect(screen.getByTestId('amount').props.value).toBe('1,00');
    rerender(<CurrencyInput label="Valor" value={250000} onChange={jest.fn()} testID="amount" />);
    expect(screen.getByTestId('amount').props.value).toBe('2.500,00');
  });
});
