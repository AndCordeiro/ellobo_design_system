import { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Radio } from './Radio';
import { RadioGroupContext, type RadioGroupContextValue } from './RadioGroupContext';
import type { RadioGroupProps } from './types';

/**
 * Groups `Radio` options under a single value. Strongly typed through the `options` prop.
 *
 * @example
 * <RadioGroup
 *   value={plan}
 *   onChange={setPlan}
 *   options={[
 *     { value: 'monthly', label: 'Mensal' },
 *     { value: 'yearly', label: 'Anual', description: '2 meses grátis' },
 *   ]}
 * />
 */
export function RadioGroup<T extends string>({
  value,
  onChange,
  options,
  children,
  disabled = false,
  direction = 'column',
  accessibilityLabel,
  style,
  testID,
}: RadioGroupProps<T>) {
  const theme = useTheme();

  const context = useMemo<RadioGroupContextValue>(
    () => ({
      value,
      // Values come from the typed `options` or from `Radio` children rendered by the consumer.
      onChange: (next: string) => onChange(next as T),
      disabled,
    }),
    [value, onChange, disabled],
  );

  return (
    <RadioGroupContext.Provider value={context}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        style={[
          {
            flexDirection: direction,
            flexWrap: direction === 'row' ? 'wrap' : 'nowrap',
            gap: theme.spacing[3],
          },
          style,
        ]}
      >
        {options
          ? options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                label={option.label}
                description={option.description}
                disabled={option.disabled}
              />
            ))
          : children}
      </View>
    </RadioGroupContext.Provider>
  );
}
