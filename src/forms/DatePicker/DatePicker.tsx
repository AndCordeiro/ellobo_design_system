import { useCallback, useMemo, useState } from 'react';
import { Pressable, Text as RNText, View } from 'react-native';
import { Button } from '../../components/Button/Button';
import { IconButton } from '../../components/IconButton/IconButton';
import { Icon } from '../../icons/Icon/Icon';
import { Modal } from '../../overlays/Modal/Modal';
import { useTheme } from '../../theme/useTheme';
import { FormField } from '../FormField/FormField';
import { getInputStyles } from '../Input/styles';
import { Calendar } from './Calendar';
import { formatShortDate, todayIsoDateString } from './calendar';
import { getTriggerStyles } from './styles';
import type { DatePickerLabels, DatePickerProps } from './types';

const defaultLabels: DatePickerLabels = {
  previousMonth: 'Mês anterior',
  nextMonth: 'Próximo mês',
  confirm: 'Confirmar',
  clear: 'Limpar',
  today: 'Hoje',
};

/**
 * Date field that opens a calendar in a bottom sheet. Values are ISO dates (`YYYY-MM-DD`), so
 * the picker never depends on the device time zone.
 *
 * @example
 * <DatePicker label="Próxima cobrança" value={date} onChange={setDate} minDate={today} />
 */
export function DatePicker({
  label,
  required,
  helperText,
  error,
  disabled = false,
  size = 'md',
  style,
  testID,
  value,
  onChange,
  minDate,
  maxDate,
  locale = 'pt-BR',
  weekStartsOn,
  placeholder = 'dd/mm/aaaa',
  formatValue,
  clearable = false,
  sheetTitle,
  labels,
  accessibilityLabel,
}: DatePickerProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string | null>(value);
  const text = { ...defaultLabels, ...labels };

  const inputStyles = useMemo(
    () =>
      getInputStyles(theme, {
        size,
        focused: open,
        disabled,
        error: Boolean(error),
        success: false,
        multiline: false,
      }),
    [theme, size, open, disabled, error],
  );
  const trigger = useMemo(
    () => getTriggerStyles(theme, value !== null, disabled),
    [theme, value, disabled],
  );

  const display =
    value === null
      ? placeholder
      : (formatValue ?? ((iso: string) => formatShortDate(iso, locale)))(value);

  const openSheet = useCallback(() => {
    setDraft(value);
    setOpen(true);
  }, [value]);

  const close = useCallback(() => setOpen(false), []);

  const confirm = useCallback(() => {
    if (draft !== null) {
      onChange(draft);
    }
    setOpen(false);
  }, [draft, onChange]);

  const clear = useCallback(() => {
    onChange(null);
    setOpen(false);
  }, [onChange]);

  const today = todayIsoDateString();
  const canPickToday =
    (minDate === undefined || today >= minDate) && (maxDate === undefined || today <= maxDate);

  return (
    <FormField
      label={label}
      required={required}
      disabled={disabled}
      helperText={helperText}
      error={error}
      style={style}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityValue={{ text: display }}
        accessibilityState={{ disabled, expanded: open }}
        accessibilityHint={error}
        disabled={disabled}
        onPress={openSheet}
        style={inputStyles.container}
        testID={testID}
      >
        <Icon name="calendar" size="md" color={inputStyles.iconColor} />
        <RNText style={trigger.valueText} numberOfLines={1}>
          {display}
        </RNText>
        {clearable && value !== null && !disabled ? (
          <IconButton
            icon="close"
            variant="ghost"
            size="sm"
            accessibilityLabel={text.clear}
            onPress={clear}
          />
        ) : (
          <Icon name="chevron-down" size="sm" color={inputStyles.iconColor} />
        )}
      </Pressable>

      <Modal
        visible={open}
        onClose={close}
        position="bottom"
        title={sheetTitle ?? label}
        scrollable={false}
        testID={testID ? `${testID}-sheet` : undefined}
        footer={
          <View style={{ gap: theme.spacing.sm }}>
            <Button onPress={confirm} disabled={draft === null} fullWidth>
              {text.confirm}
            </Button>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: theme.spacing.md }}>
              {canPickToday ? (
                <Button variant="ghost" size="sm" onPress={() => setDraft(today)}>
                  {text.today}
                </Button>
              ) : null}
              {clearable && value !== null ? (
                <Button variant="ghost" size="sm" onPress={clear}>
                  {text.clear}
                </Button>
              ) : null}
            </View>
          </View>
        }
      >
        <Calendar
          value={draft}
          onChange={setDraft}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          weekStartsOn={weekStartsOn}
          labels={text}
          testID={testID ? `${testID}-calendar` : undefined}
        />
      </Modal>
    </FormField>
  );
}
