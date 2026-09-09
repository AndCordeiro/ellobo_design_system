import {
  addMonths,
  buildMonthGrid,
  daysInMonth,
  formatLongDate,
  formatMonthTitle,
  formatShortDate,
  isIsoDateString,
  isWithinRange,
  weekdayLabels,
} from './calendar';

describe('calendar helpers', () => {
  it('validates ISO dates including leap days', () => {
    expect(isIsoDateString('2028-02-29')).toBe(true);
    expect(isIsoDateString('2026-02-29')).toBe(false);
    expect(isIsoDateString('18/09/2026')).toBe(false);
    expect(daysInMonth(2026, 4)).toBe(30);
  });

  it('builds a 6x7 grid with the correct offset', () => {
    const grid = buildMonthGrid({ year: 2026, month: 9 });
    expect(grid).toHaveLength(6);
    expect(grid[0]).toEqual([
      null,
      null,
      '2026-09-01',
      '2026-09-02',
      '2026-09-03',
      '2026-09-04',
      '2026-09-05',
    ]);
    expect(grid[4]?.[3]).toBe('2026-09-30');
    const monday = buildMonthGrid({ year: 2026, month: 9 }, 1);
    expect(monday[0]?.[1]).toBe('2026-09-01');
  });

  it('navigates across years', () => {
    expect(addMonths({ year: 2026, month: 12 }, 1)).toEqual({ year: 2027, month: 1 });
    expect(addMonths({ year: 2026, month: 1 }, -1)).toEqual({ year: 2025, month: 12 });
  });

  it('checks ranges inclusively', () => {
    expect(isWithinRange('2026-09-18', '2026-09-18', '2026-09-18')).toBe(true);
    expect(isWithinRange('2026-09-17', '2026-09-18', undefined)).toBe(false);
    expect(isWithinRange('2026-09-19', undefined, '2026-09-18')).toBe(false);
  });

  it('formats with the locale', () => {
    expect(formatShortDate('2026-09-18', 'pt-BR')).toBe('18/09/2026');
    expect(formatLongDate('2026-09-18', 'pt-BR')).toBe('18 de setembro de 2026');
    expect(formatMonthTitle({ year: 2026, month: 9 }, 'pt-BR')).toBe('Setembro de 2026');
    expect(weekdayLabels('pt-BR')[0]).toBe('Dom');
    expect(weekdayLabels('en-US', 1)[0]).toBe('Mon');
  });
});
