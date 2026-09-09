import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { IconButton } from '../../components/IconButton/IconButton';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';
import {
  addMonths,
  buildMonthGrid,
  formatLongDate,
  formatMonthTitle,
  isSameMonth,
  isWithinRange,
  monthOf,
  todayIsoDateString,
  toIsoDateString,
  weekdayLabels,
  type CalendarMonth,
} from './calendar';
import { getCalendarStyles } from './styles';
import type { CalendarProps } from './types';

const defaultLabels = { previousMonth: 'Mês anterior', nextMonth: 'Próximo mês' };

/**
 * Month grid for picking a single day. Stateless about the value; owns only the visible month.
 *
 * @example
 * <Calendar value={date} onChange={setDate} minDate="2026-01-01" />
 */
export function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  locale = 'pt-BR',
  weekStartsOn = 0,
  initialMonth,
  labels,
  style,
  testID,
}: CalendarProps) {
  const theme = useTheme();
  const styles = useMemo(() => getCalendarStyles(theme), [theme]);
  const today = todayIsoDateString();
  const [visibleMonth, setVisibleMonth] = useState<CalendarMonth>(() =>
    monthOf(value ?? initialMonth ?? today),
  );
  const [syncedValue, setSyncedValue] = useState(value);
  if (value !== syncedValue) {
    setSyncedValue(value);
    if (value !== null && !isSameMonth(monthOf(value), visibleMonth)) {
      setVisibleMonth(monthOf(value));
    }
  }

  const grid = useMemo(
    () => buildMonthGrid(visibleMonth, weekStartsOn),
    [visibleMonth, weekStartsOn],
  );
  const weekdays = useMemo(() => weekdayLabels(locale, weekStartsOn), [locale, weekStartsOn]);
  const text = { ...defaultLabels, ...labels };

  const canGoPrevious =
    minDate === undefined ||
    toIsoDateString(visibleMonth.year, visibleMonth.month, 1) > minDate.slice(0, 8) + '01';
  const canGoNext =
    maxDate === undefined ||
    toIsoDateString(visibleMonth.year, visibleMonth.month, 1) < maxDate.slice(0, 8) + '01';

  return (
    <View style={style} testID={testID} accessibilityRole="none">
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          variant="ghost"
          size="sm"
          accessibilityLabel={text.previousMonth}
          disabled={!canGoPrevious}
          onPress={() => setVisibleMonth((current) => addMonths(current, -1))}
        />
        <Text variant="titleMedium" accessibilityRole="header" accessibilityLiveRegion="polite">
          {formatMonthTitle(visibleMonth, locale)}
        </Text>
        <IconButton
          icon="chevron-right"
          variant="ghost"
          size="sm"
          accessibilityLabel={text.nextMonth}
          disabled={!canGoNext}
          onPress={() => setVisibleMonth((current) => addMonths(current, 1))}
        />
      </View>
      <View style={styles.weekRow}>
        {weekdays.map((weekday, index) => (
          <Text key={`${weekday}-${index}`} style={styles.weekday} accessibilityElementsHidden>
            {weekday}
          </Text>
        ))}
      </View>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.weekRow}>
          {row.map((cell, cellIndex) => {
            if (cell === null) {
              return <View key={`empty-${rowIndex}-${cellIndex}`} style={styles.cell} />;
            }
            const isSelected = cell === value;
            const isToday = cell === today;
            const isDisabled = !isWithinRange(cell, minDate, maxDate);
            return (
              <Pressable
                key={cell}
                accessibilityRole="button"
                accessibilityLabel={formatLongDate(cell, locale)}
                accessibilityState={{ selected: isSelected, disabled: isDisabled }}
                disabled={isDisabled}
                onPress={() => onChange(cell)}
                hitSlop={4}
                testID={testID ? `${testID}-day-${cell}` : undefined}
                style={({ pressed }) => [
                  styles.cell,
                  isToday && !isSelected ? styles.today : null,
                  isSelected ? styles.selected : null,
                  pressed && !isSelected ? styles.pressed : null,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    isSelected ? styles.selectedText : null,
                    isDisabled ? styles.disabledText : null,
                  ]}
                >
                  {String(Number(cell.slice(8, 10)))}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
