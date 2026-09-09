/**
 * Locale-aware money helpers built on `Intl`. Amounts travel as integers in the currency's minor
 * unit (cents for BRL/USD/EUR, whole yen for JPY) so no float ever reaches the caller.
 */

const digitsCache = new Map<string, number>();

/** Number of fraction digits the currency uses (BRL 2, JPY 0, KWD 3). */
export function minorUnitDigits(currency: string): number {
  const cached = digitsCache.get(currency);
  if (cached !== undefined) {
    return cached;
  }
  let digits = 2;
  try {
    digits =
      new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions()
        .maximumFractionDigits ?? 2;
  } catch {
    digits = 2;
  }
  digitsCache.set(currency, digits);
  return digits;
}

/** Narrow currency symbol for the locale (`R$`, `$`, `€`); falls back to the ISO code. */
export function currencySymbol(currency: string, locale: string): string {
  try {
    const part = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
    })
      .formatToParts(0)
      .find((item) => item.type === 'currency');
    return part?.value ?? currency;
  } catch {
    return currency;
  }
}

/** Formats minor units as a plain localized number without symbol: 5990 → `59,90` (pt-BR). */
export function formatMinorUnits(minor: number, currency: string, locale: string): string {
  const digits = minorUnitDigits(currency);
  const amount = minor / 10 ** digits;
  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
      useGrouping: true,
    }).format(amount);
  } catch {
    return amount.toFixed(digits);
  }
}

/** Formats minor units with the currency symbol, for display: 5990 → `R$ 59,90`. */
export function formatCurrency(minor: number, currency: string, locale: string): string {
  const digits = minorUnitDigits(currency);
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
      minor / 10 ** digits,
    );
  } catch {
    return `${currency} ${formatMinorUnits(minor, currency, locale)}`;
  }
}

export const MAX_INPUT_DIGITS = 15;

/**
 * ATM-style mask: every digit the user types shifts in from the right. Any non-digit character
 * (separators, symbol, pasted text) is ignored. Returns `null` when nothing is typed.
 */
export function digitsToMinorUnits(text: string): number | null {
  const digits = text
    .replace(/\D/g, '')
    .replace(/^0+(?=\d)/, '')
    .slice(0, MAX_INPUT_DIGITS);
  if (digits === '') {
    return null;
  }
  return Number(digits);
}
