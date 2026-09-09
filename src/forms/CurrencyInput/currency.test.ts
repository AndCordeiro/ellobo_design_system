import {
  currencySymbol,
  digitsToMinorUnits,
  formatCurrency,
  formatMinorUnits,
  minorUnitDigits,
} from './currency';

describe('currency helpers', () => {
  it('knows the minor unit of each currency', () => {
    expect(minorUnitDigits('BRL')).toBe(2);
    expect(minorUnitDigits('JPY')).toBe(0);
    expect(minorUnitDigits('KWD')).toBe(3);
  });

  it('formats minor units per locale', () => {
    expect(formatMinorUnits(5990, 'BRL', 'pt-BR')).toBe('59,90');
    expect(formatMinorUnits(123456789, 'BRL', 'pt-BR')).toBe('1.234.567,89');
    expect(formatMinorUnits(1234567, 'USD', 'en-US')).toBe('12,345.67');
    expect(formatMinorUnits(1234, 'JPY', 'ja-JP')).toBe('1,234');
    expect(formatMinorUnits(5990, 'EUR', 'de-DE')).toBe('59,90');
  });

  it('formats with symbols for display', () => {
    expect(formatCurrency(5990, 'BRL', 'pt-BR').replace(/[\u00a0\u202f]/g, ' ')).toBe('R$ 59,90');
    expect(formatCurrency(5990, 'USD', 'en-US')).toBe('$59.90');
    expect(formatCurrency(5990, 'EUR', 'de-DE').replace(/[\u00a0\u202f]/g, ' ')).toBe('59,90 €');
  });

  it('exposes narrow symbols', () => {
    expect(currencySymbol('BRL', 'pt-BR')).toBe('R$');
    expect(currencySymbol('USD', 'en-US')).toBe('$');
    expect(currencySymbol('EUR', 'pt-BR')).toBe('€');
  });

  it('masks digits ATM-style, ignoring separators and leading zeros', () => {
    expect(digitsToMinorUnits('5990')).toBe(5990);
    expect(digitsToMinorUnits('59,90')).toBe(5990);
    expect(digitsToMinorUnits('R$ 1.234,56')).toBe(123456);
    expect(digitsToMinorUnits('0007')).toBe(7);
    expect(digitsToMinorUnits('')).toBeNull();
    expect(digitsToMinorUnits('abc')).toBeNull();
  });
});
