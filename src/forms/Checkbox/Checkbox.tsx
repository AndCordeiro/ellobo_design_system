import { useCallback } from 'react';
import { Pressable, View, type PressableStateCallbackType, type ViewStyle } from 'react-native';
import { Icon } from '../../icons/Icon/Icon';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';
import type { CheckboxProps } from './types';

const BOX_SIZE = 22;

/**
 * Checkbox with an interactive label. The whole row is the touch target.
 *
 * @example
 * <Checkbox checked={accepted} onChange={setAccepted} label="Aceito os termos" />
 */
export function Checkbox({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  indeterminate = false,
  error = false,
  style,
  accessibilityLabel,
  accessibilityState,
  hitSlop,
  ref,
  ...rest
}: CheckboxProps) {
  const theme = useTheme();
  const active = checked || indeterminate;

  const handlePress = useCallback(() => {
    onChange?.(!checked);
  }, [checked, onChange]);

  const boxStyle: ViewStyle = {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: theme.radius.xs,
    borderWidth: active ? 0 : 2,
    borderColor: disabled
      ? theme.colors.border.disabled
      : error
        ? theme.colors.feedback.error
        : theme.colors.border.strong,
    backgroundColor: active
      ? disabled
        ? theme.colors.action.disabled
        : error
          ? theme.colors.feedback.error
          : theme.colors.action.primary
      : theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const resolveStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      {
        flexDirection: 'row' as const,
        alignItems: 'flex-start' as const,
        gap: theme.spacing[3],
        opacity: pressed && !disabled ? theme.opacity.pressed : 1,
        alignSelf: 'flex-start' as const,
      },
      style,
    ],
    [theme, disabled, style],
  );

  const checkColor = disabled
    ? theme.colors.action.disabledContent
    : theme.colors.action.primaryContent;

  return (
    <Pressable
      ref={ref}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel ?? (typeof label === 'string' ? label : undefined)}
      accessibilityState={{
        checked: indeterminate ? 'mixed' : checked,
        disabled,
        ...accessibilityState,
      }}
      disabled={disabled}
      hitSlop={hitSlop ?? 8}
      onPress={handlePress}
      style={resolveStyle}
      {...rest}
    >
      <View style={boxStyle}>
        {indeterminate ? (
          <Icon name="minus" size={14} color={checkColor} strokeWidth={3} />
        ) : checked ? (
          <Icon name="check" size={14} color={checkColor} strokeWidth={3} />
        ) : null}
      </View>
      {label || description ? (
        <View style={{ flexShrink: 1, gap: 2 }}>
          {typeof label === 'string' ? (
            <Text variant="bodyMedium" color={disabled ? 'disabled' : 'primary'}>
              {label}
            </Text>
          ) : (
            label
          )}
          {description ? (
            <Text variant="bodySmall" color={disabled ? 'disabled' : 'secondary'}>
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}
