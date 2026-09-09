/**
 * Pure calendar helpers on ISO dates (`YYYY-MM-DD`). No time zones and no dependencies: the same
 * input produces the same grid on every device, which keeps the picker predictable and testable.
 */
export type IsoDateString = string;

export interface CalendarMonth {
  year: number;
  /** 1-12 */
  month: number;
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

export function isIsoDateString(value: string): value is IsoDateString {
  const match = ISO_DATE.exec(value);
  if (!match) {
    return false;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month);
}

export function toIsoDateString(year: number, month: number, day: number): IsoDateString {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function parseIsoDateString(value: IsoDateString): {
  year: number;
  month: number;
  day: number;
} {
  if (!isIsoDateString(value)) {
    throw new RangeError(`Invalid ISO date: ${value}`);
  }
  return {
    year: Number(value.slice(0, 4)),
    month: Number(value.slice(5, 7)),
    day: Number(value.slice(8, 10)),
  };
}

/** Local calendar date of `now` as an ISO string (device time zone). */
export function todayIsoDateString(now: Date = new Date()): IsoDateString {
  return toIsoDateString(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function monthOf(value: IsoDateString): CalendarMonth {
  const { year, month } = parseIsoDateString(value);
  return { year, month };
}

export function addMonths({ year, month }: CalendarMonth, delta: number): CalendarMonth {
  const total = year * 12 + (month - 1) + delta;
  return { year: Math.floor(total / 12), month: (total % 12) + 1 };
}

export function isSameMonth(left: CalendarMonth, right: CalendarMonth): boolean {
  return left.year === right.year && left.month === right.month;
}

/** Weekday of the first day of the month, 0 = Sunday. */
export function firstWeekday({ year, month }: CalendarMonth): number {
  return new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
}

export type CalendarCell = IsoDateString | null;

/**
 * 6 rows × 7 columns; cells outside the month are `null`. `weekStartsOn` follows the JavaScript
 * convention (0 = Sunday, 1 = Monday).
 */
export function buildMonthGrid(month: CalendarMonth, weekStartsOn: 0 | 1 = 0): CalendarCell[][] {
  const offset = (firstWeekday(month) - weekStartsOn + 7) % 7;
  const total = daysInMonth(month.year, month.month);
  const cells: CalendarCell[] = [];
  for (let index = 0; index < 42; index += 1) {
    const day = index - offset + 1;
    cells.push(day >= 1 && day <= total ? toIsoDateString(month.year, month.month, day) : null);
  }
  const rows: CalendarCell[][] = [];
  for (let row = 0; row < 6; row += 1) {
    rows.push(cells.slice(row * 7, row * 7 + 7));
  }
  return rows;
}

export function isWithinRange(
  value: IsoDateString,
  minDate: IsoDateString | undefined,
  maxDate: IsoDateString | undefined,
): boolean {
  if (minDate !== undefined && value < minDate) {
    return false;
  }
  if (maxDate !== undefined && value > maxDate) {
    return false;
  }
  return true;
}

function toDate(value: IsoDateString): Date {
  const { year, month, day } = parseIsoDateString(value);
  return new Date(Date.UTC(year, month - 1, day, 12));
}

export function formatMonthTitle(month: CalendarMonth, locale: string): string {
  const label = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(month.year, month.month - 1, 1, 12)));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function weekdayLabels(locale: string, weekStartsOn: 0 | 1 = 0): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
  // 2023-01-01 is a Sunday.
  return Array.from({ length: 7 }, (_, index) => {
    const weekday = (index + weekStartsOn) % 7;
    const label = formatter.format(new Date(Date.UTC(2023, 0, 1 + weekday, 12)));
    return label.replace('.', '').charAt(0).toUpperCase() + label.replace('.', '').slice(1, 3);
  });
}

/** Short numeric display, e.g. `18/09/2026` in pt-BR or `09/18/2026` in en-US. */
export function formatShortDate(value: IsoDateString, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(toDate(value));
}

/** Long, screen-reader friendly display, e.g. `18 de setembro de 2026`. */
export function formatLongDate(value: IsoDateString, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(toDate(value));
}
