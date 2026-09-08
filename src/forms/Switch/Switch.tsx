import { useCallback, type ReactNode } from 'react';
import {
  Platform,
  Pressable,
  Switch as RNSwitch,
  View,
  type StyleProp,
  type SwitchProps as RNSwitchProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';

export interface SwitchProps extends Omit<
  RNSwitchProps,
  'style' | 'trackColor' | 'thumbColor' | 'ios_backgroundColor'
> {
  /** Label rendered next to the control. Pressing it toggles the switch. */
  label?: ReactNode;
  description?: string;
  /** Side of the label relative to the switch. Defaults to `left`. */
  labelPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
}

/**
 * Themed native switch with an optional interactive label.
 *
 * @example
 * <Switch value={enabled} onValueChange={setEnabled} label="Notificações" />
 */
export function Switch({
  value,
  onValueChange,
  label,
  description,
  labelPosition = 'left',
  disabled = false,
  style,
  accessibilityLabel,
  ...rest
}: SwitchProps) {
  const theme = useTheme();

  const toggle = useCallback(() => {
    onValueChange?.(!value);
  }, [onValueChange, value]);

  const control = (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: theme.colors.border.strong, true: theme.colors.action.primary }}
      ios_backgroundColor={theme.colors.border.strong}
      accessibilityLabel={accessibilityLabel ?? (typeof label === 'string' ? label : undefined)}
      {...rest}
    />
  );

  if (!label && !description) {
    return <View style={style}>{control}</View>;
  }

  const labelBlock = (
    <View style={{ flex: 1, gap: 2 }}>
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
  );

  return (
    <Pressable
      onPress={disabled ? undefined : toggle}
      disabled={disabled}
      accessible={false}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing[3],
          minHeight: Platform.OS === 'ios' ? 31 : 32,
        },
        style,
      ]}
    >
      {labelPosition === 'left' ? labelBlock : null}
      {control}
      {labelPosition === 'right' ? labelBlock : null}
    </Pressable>
  );
}
