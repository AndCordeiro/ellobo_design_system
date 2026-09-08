import { useCallback } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon } from '../../icons/Icon/Icon';
import type { IconName } from '../../icons/Icon/icons';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';
import { getElevationStyle } from '../../utils/styles';

export interface SegmentedControlOption<T extends string | number> {
  label: string;
  value: T;
  icon?: IconName;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string | number> {
  options: ReadonlyArray<SegmentedControlOption<T>>;
  value: T;
  onChange: (value: T) => void;
  /** Control height. Defaults to `md`. */
  size?: 'sm' | 'md';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
}

/**
 * Mutually exclusive segments. Strongly typed: `value` and `onChange` infer from `options`.
 *
 * @example
 * <SegmentedControl
 *   options={[
 *     { label: 'Todos', value: 'all' },
 *     { label: 'Ativos', value: 'active' },
 *   ]}
 *   value={filter}
 *   onChange={setFilter}
 * />
 */
export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  size = 'md',
  disabled = false,
  style,
  accessibilityLabel,
  testID,
}: SegmentedControlProps<T>) {
  const theme = useTheme();
  const height = size === 'sm' ? 32 : 40;

  const handlePress = useCallback((next: T) => () => onChange(next), [onChange]);

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.background.tertiary,
          gap: 2,
        },
        style,
      ]}
    >
      {options.map((option) => {
        const selected = option.value === value;
        const optionDisabled = disabled || option.disabled === true;
        const contentColor = optionDisabled
          ? theme.colors.content.disabled
          : selected
            ? theme.colors.content.primary
            : theme.colors.content.secondary;

        return (
          <Pressable
            key={String(option.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected, disabled: optionDisabled }}
            accessibilityLabel={option.label}
            disabled={optionDisabled}
            onPress={handlePress(option.value)}
            style={({ pressed }) => [
              {
                flex: 1,
                height: height - theme.spacing.xs * 2,
                minHeight: height - theme.spacing.xs * 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: theme.spacing.xs,
                paddingHorizontal: theme.spacing.sm,
                borderRadius: theme.radius.md - theme.spacing.xs,
                backgroundColor: selected ? theme.colors.background.elevated : 'transparent',
                opacity: pressed && !selected && !optionDisabled ? theme.opacity.pressed : 1,
              },
              selected ? getElevationStyle(theme, 'sm') : null,
            ]}
            testID={testID ? `${testID}-${String(option.value)}` : undefined}
          >
            {option.icon ? <Icon name={option.icon} size="sm" color={contentColor} /> : null}
            <Text
              variant={size === 'sm' ? 'labelMedium' : 'labelLarge'}
              weight={selected ? 'semibold' : 'medium'}
              numberOfLines={1}
              style={{ color: contentColor }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
