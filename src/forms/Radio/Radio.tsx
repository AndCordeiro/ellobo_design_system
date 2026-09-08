import { useCallback } from 'react';
import { Pressable, View, type PressableStateCallbackType, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';
import { useRadioGroup } from './RadioGroupContext';
import type { RadioProps } from './types';

const OUTER_SIZE = 22;
const INNER_SIZE = 10;

/**
 * Single-choice option. Use inside `RadioGroup` or control it with `selected`/`onSelect`.
 */
export function Radio({
  value,
  label,
  description,
  disabled: disabledProp = false,
  selected: selectedProp,
  onSelect,
  style,
  accessibilityLabel,
  accessibilityState,
  hitSlop,
  ref,
  ...rest
}: RadioProps) {
  const theme = useTheme();
  const group = useRadioGroup();

  const disabled = disabledProp || (group?.disabled ?? false);
  const selected = group ? group.value === value : Boolean(selectedProp);

  const handlePress = useCallback(() => {
    if (group) {
      group.onChange(value);
    } else {
      onSelect?.(value);
    }
  }, [group, onSelect, value]);

  const outerStyle: ViewStyle = {
    width: OUTER_SIZE,
    height: OUTER_SIZE,
    borderRadius: theme.radius.full,
    borderWidth: 2,
    borderColor: disabled
      ? theme.colors.border.disabled
      : selected
        ? theme.colors.action.primary
        : theme.colors.border.strong,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const innerStyle: ViewStyle = {
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: theme.radius.full,
    backgroundColor: disabled ? theme.colors.action.disabledContent : theme.colors.action.primary,
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

  return (
    <Pressable
      ref={ref}
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel ?? (typeof label === 'string' ? label : undefined)}
      accessibilityState={{ checked: selected, selected, disabled, ...accessibilityState }}
      disabled={disabled}
      hitSlop={hitSlop ?? 8}
      onPress={handlePress}
      style={resolveStyle}
      {...rest}
    >
      <View style={outerStyle}>{selected ? <View style={innerStyle} /> : null}</View>
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
