import { useCallback } from 'react';
import { Pressable, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { Badge } from '../../display/Badge/Badge';
import { Icon } from '../../icons/Icon/Icon';
import type { IconName } from '../../icons/Icon/icons';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';

export interface TabItem<T extends string> {
  key: T;
  label: string;
  icon?: IconName;
  /** Count or short text displayed in a badge. */
  badge?: number | string;
  disabled?: boolean;
}

export interface TabsProps<T extends string> {
  items: ReadonlyArray<TabItem<T>>;
  value: T;
  onChange: (key: T) => void;
  /** `underline` (default) or `pill`. */
  variant?: 'underline' | 'pill';
  /** Enables horizontal scrolling for many tabs. Tabs stretch to fill the width otherwise. */
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
}

/**
 * Visual tab bar. Content switching and navigation are handled by the consumer.
 *
 * @example
 * <Tabs
 *   items={[
 *     { key: 'overview', label: 'Resumo' },
 *     { key: 'history', label: 'Histórico', badge: 3 },
 *   ]}
 *   value={tab}
 *   onChange={setTab}
 * />
 */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  variant = 'underline',
  scrollable = false,
  style,
  accessibilityLabel,
  testID,
}: TabsProps<T>) {
  const theme = useTheme();
  const handlePress = useCallback((key: T) => () => onChange(key), [onChange]);

  const tabs = items.map((item) => {
    const selected = item.key === value;
    const disabled = item.disabled === true;
    const contentColor = disabled
      ? theme.colors.content.disabled
      : selected
        ? variant === 'pill'
          ? theme.colors.action.primaryContent
          : theme.colors.content.brand
        : theme.colors.content.secondary;

    return (
      <Pressable
        key={item.key}
        accessibilityRole="tab"
        accessibilityState={{ selected, disabled }}
        accessibilityLabel={item.label}
        disabled={disabled}
        onPress={handlePress(item.key)}
        style={({ pressed }) => [
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.xs,
            paddingHorizontal: theme.spacing.md,
            minHeight: 44,
            flex: scrollable ? undefined : 1,
            opacity: pressed && !selected && !disabled ? theme.opacity.pressed : 1,
          },
          variant === 'underline'
            ? {
                borderBottomWidth: 2,
                borderBottomColor: selected ? theme.colors.action.primary : 'transparent',
                marginBottom: -1,
              }
            : {
                minHeight: 36,
                borderRadius: theme.radius.full,
                backgroundColor: selected ? theme.colors.action.primary : 'transparent',
              },
        ]}
        testID={testID ? `${testID}-${item.key}` : undefined}
      >
        {item.icon ? <Icon name={item.icon} size="sm" color={contentColor} /> : null}
        <Text
          variant="labelLarge"
          weight={selected ? 'semibold' : 'medium'}
          numberOfLines={1}
          style={{ color: contentColor }}
        >
          {item.label}
        </Text>
        {item.badge !== undefined ? (
          <Badge variant={selected && variant === 'pill' ? 'neutral' : 'brand'} size="sm">
            {item.badge}
          </Badge>
        ) : null}
      </Pressable>
    );
  });

  const containerStyle: ViewStyle =
    variant === 'underline'
      ? { borderBottomWidth: 1, borderBottomColor: theme.colors.border.primary }
      : {
          padding: theme.spacing.xs,
          borderRadius: theme.radius.full,
          backgroundColor: theme.colors.background.tertiary,
          alignSelf: scrollable ? 'flex-start' : 'stretch',
        };

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        accessibilityRole="tablist"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        style={style}
        contentContainerStyle={[containerStyle, { flexDirection: 'row' }]}
      >
        {tabs}
      </ScrollView>
    );
  }

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={[containerStyle, { flexDirection: 'row' }, style]}
    >
      {tabs}
    </View>
  );
}
