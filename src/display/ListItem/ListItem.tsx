import { useCallback, type ReactNode, type Ref } from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Icon } from '../../icons/Icon/Icon';
import { Divider } from '../../layout/Divider/Divider';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';

export interface ListItemProps extends Omit<
  PressableProps,
  'children' | 'style' | 'disabled' | 'ref'
> {
  title: string;
  description?: string;
  /** Element rendered at the start (icon, avatar…). */
  left?: ReactNode;
  /** Element rendered at the end (icon, badge, switch…). */
  right?: ReactNode;
  /** Shows a trailing chevron. Defaults to `true` when `onPress` is set and `right` is absent. */
  chevron?: boolean;
  disabled?: boolean;
  /** Draws a divider under the item. */
  divider?: boolean;
  style?: StyleProp<ViewStyle>;
  ref?: Ref<View>;
}

/**
 * Row for lists and menus. Interactive when `onPress` is provided, static otherwise.
 *
 * @example
 * <ListItem
 *   title="Configurações"
 *   description="Gerencie sua conta"
 *   left={<Icon name="settings" />}
 *   onPress={openSettings}
 * />
 */
export function ListItem({
  title,
  description,
  left,
  right,
  chevron,
  disabled = false,
  divider = false,
  style,
  onPress,
  accessibilityLabel,
  accessibilityState,
  ref,
  ...rest
}: ListItemProps) {
  const theme = useTheme();
  const interactive = Boolean(onPress);
  const showChevron = chevron ?? (interactive && !right);

  const resolveStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: theme.spacing[3],
        paddingHorizontal: theme.spacing[4],
        paddingVertical: theme.spacing[3],
        minHeight: 56,
        backgroundColor: pressed && interactive ? theme.colors.background.secondary : 'transparent',
        opacity: disabled ? theme.opacity.disabled : 1,
      },
      style,
    ],
    [theme, interactive, disabled, style],
  );

  const content = (
    <>
      {left ? <View>{left}</View> : null}
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="bodyLarge" weight="medium" numberOfLines={2}>
          {title}
        </Text>
        {description ? (
          <Text variant="bodySmall" color="secondary" numberOfLines={2}>
            {description}
          </Text>
        ) : null}
      </View>
      {right ? <View>{right}</View> : null}
      {showChevron ? <Icon name="chevron-right" size="md" color="tertiary" /> : null}
    </>
  );

  return (
    <View>
      <Pressable
        ref={ref}
        accessibilityRole={interactive ? 'button' : undefined}
        accessibilityLabel={
          accessibilityLabel ?? (description ? `${title}, ${description}` : title)
        }
        accessibilityState={{ disabled, ...accessibilityState }}
        disabled={disabled || !interactive}
        onPress={onPress}
        style={resolveStyle}
        {...rest}
      >
        {content}
      </Pressable>
      {divider ? <Divider inset="md" /> : null}
    </View>
  );
}
