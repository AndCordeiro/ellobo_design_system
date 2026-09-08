import { useCallback, type ReactNode, type Ref } from 'react';
import {
  Pressable,
  type View,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Icon } from '../../icons/Icon/Icon';
import type { IconName } from '../../icons/Icon/icons';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';

export interface ChipProps extends Omit<PressableProps, 'children' | 'style' | 'disabled' | 'ref'> {
  children: ReactNode;
  /** Selected state. */
  selected?: boolean;
  disabled?: boolean;
  leftIcon?: IconName;
  /** When provided, renders a remove button at the end of the chip. */
  onRemove?: () => void;
  /** Accessibility label of the remove button. */
  removeLabel?: string;
  style?: StyleProp<ViewStyle>;
  ref?: Ref<View>;
}

/**
 * Interactive, selectable chip for filters and multi-selection.
 *
 * @example
 * <Chip selected={active} onPress={toggle}>Ativos</Chip>
 */
export function Chip({
  children,
  selected = false,
  disabled = false,
  leftIcon,
  onRemove,
  removeLabel = 'Remover',
  style,
  accessibilityState,
  onPress,
  ref,
  ...rest
}: ChipProps) {
  const theme = useTheme();

  const contentColor = disabled
    ? theme.colors.content.disabled
    : selected
      ? theme.colors.content.brand
      : theme.colors.content.primary;

  const resolveStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: theme.spacing.xs,
        height: 34,
        paddingHorizontal: theme.spacing[3],
        borderRadius: theme.radius.full,
        borderWidth: 1,
        borderColor: disabled
          ? theme.colors.border.disabled
          : selected
            ? theme.colors.border.focus
            : theme.colors.border.primary,
        backgroundColor: disabled
          ? theme.colors.action.disabled
          : selected
            ? theme.colors.background.brandSubtle
            : pressed
              ? theme.colors.background.tertiary
              : theme.colors.background.secondary,
        alignSelf: 'flex-start' as const,
      },
      style,
    ],
    [theme, selected, disabled, style],
  );

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled, ...accessibilityState }}
      disabled={disabled || !onPress}
      onPress={onPress}
      style={resolveStyle}
      {...rest}
    >
      {leftIcon ? <Icon name={leftIcon} size="sm" color={contentColor} /> : null}
      {typeof children === 'string' ? (
        <Text variant="labelLarge" style={{ color: contentColor }} numberOfLines={1}>
          {children}
        </Text>
      ) : (
        children
      )}
      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={removeLabel}
          disabled={disabled}
          hitSlop={8}
          onPress={onRemove}
          style={{ marginLeft: 2, marginRight: -4 }}
          testID="chip-remove-button"
        >
          <Icon name="close" size="sm" color={contentColor} />
        </Pressable>
      ) : null}
    </Pressable>
  );
}
