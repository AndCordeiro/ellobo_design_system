import type { TextStyle, ViewStyle } from 'react-native';
import type { DesignSystemTheme } from '../../theme/types';
import { getTypographyStyle } from '../../utils/styles';

export const CELL_SIZE = 40;

export function getCalendarStyles(theme: DesignSystemTheme) {
  const header: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  };
  const weekRow: ViewStyle = { flexDirection: 'row', justifyContent: 'space-between' };
  const weekday: TextStyle = {
    ...getTypographyStyle(theme, 'labelSmall'),
    width: CELL_SIZE,
    textAlign: 'center',
    color: theme.colors.content.tertiary,
    paddingVertical: theme.spacing.xs,
  };
  const cell: ViewStyle = {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  };
  const today: ViewStyle = { borderWidth: 1, borderColor: theme.colors.border.focus };
  const selected: ViewStyle = { backgroundColor: theme.colors.action.primary };
  const pressed: ViewStyle = { backgroundColor: theme.colors.background.brandSubtle };
  const dayText: TextStyle = {
    ...getTypographyStyle(theme, 'bodyMedium'),
    color: theme.colors.content.primary,
  };
  const selectedText: TextStyle = { color: theme.colors.action.primaryContent };
  const disabledText: TextStyle = { color: theme.colors.content.disabled };
  return {
    header,
    weekRow,
    weekday,
    cell,
    today,
    selected,
    pressed,
    dayText,
    selectedText,
    disabledText,
  };
}

export function getTriggerStyles(theme: DesignSystemTheme, hasValue: boolean, disabled: boolean) {
  const valueText: TextStyle = {
    ...getTypographyStyle(theme, 'bodyLarge'),
    flex: 1,
    color: disabled
      ? theme.components.input.disabledTextColor
      : hasValue
        ? theme.components.input.textColor
        : theme.components.input.placeholderColor,
  };
  return { valueText };
}
