import type { StyleProp, ViewStyle } from 'react-native';
import type { InputProps } from '../Input/types';
import type { IsoDateString } from './calendar';

export interface CalendarLabels {
  previousMonth: string;
  nextMonth: string;
}

export interface CalendarProps {
  /** Selected date as `YYYY-MM-DD`, or `null`. */
  value: IsoDateString | null;
  onChange: (value: IsoDateString) => void;
  /** Earliest selectable date (inclusive). */
  minDate?: IsoDateString;
  /** Latest selectable date (inclusive). */
  maxDate?: IsoDateString;
  /** BCP 47 locale used for month and weekday names. Defaults to `pt-BR`. */
  locale?: string;
  /** 0 = Sunday (default), 1 = Monday. */
  weekStartsOn?: 0 | 1;
  /** Month shown when there is no value. Defaults to the current month. */
  initialMonth?: IsoDateString;
  labels?: Partial<CalendarLabels>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface DatePickerLabels extends CalendarLabels {
  confirm: string;
  clear: string;
  today: string;
}

export interface DatePickerProps extends Pick<
  InputProps,
  'label' | 'required' | 'helperText' | 'error' | 'disabled' | 'size' | 'style' | 'testID'
> {
  value: IsoDateString | null;
  onChange: (value: IsoDateString | null) => void;
  minDate?: IsoDateString;
  maxDate?: IsoDateString;
  /** BCP 47 locale for display and calendar names. Defaults to `pt-BR`. */
  locale?: string;
  weekStartsOn?: 0 | 1;
  placeholder?: string;
  /** Custom display of the selected value. Defaults to the locale short date. */
  formatValue?: (value: IsoDateString) => string;
  /** Shows a clear action when a value is set. Defaults to `false`. */
  clearable?: boolean;
  /** Title of the bottom sheet. Defaults to the label. */
  sheetTitle?: string;
  labels?: Partial<DatePickerLabels>;
  accessibilityLabel?: string;
}
