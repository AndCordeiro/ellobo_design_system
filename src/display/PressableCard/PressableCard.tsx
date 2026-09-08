import { useCallback, type ReactNode, type Ref } from 'react';
import {
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getCardStyle } from '../Card/styles';
import type { CardProps } from '../Card/types';

export interface PressableCardProps
  extends
    Omit<PressableProps, 'children' | 'style' | 'ref'>,
    Pick<CardProps, 'variant' | 'padding' | 'borderRadius'> {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  ref?: Ref<View>;
}

/**
 * Interactive `Card` with press feedback and button semantics.
 *
 * @example
 * <PressableCard onPress={openDetails} accessibilityLabel="Abrir detalhes">
 *   ...
 * </PressableCard>
 */
export function PressableCard({
  variant = 'elevated',
  padding,
  borderRadius,
  disabled: disabledProp,
  style,
  accessibilityState,
  ref,
  ...rest
}: PressableCardProps) {
  const theme = useTheme();
  const disabled = disabledProp ?? false;

  const resolveStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      getCardStyle(theme, variant, padding, borderRadius),
      {
        opacity: disabled ? theme.opacity.disabled : pressed ? theme.opacity.pressed : 1,
        transform: [{ scale: pressed && !disabled ? 0.985 : 1 }],
      },
      style,
    ],
    [theme, variant, padding, borderRadius, disabled, style],
  );

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ disabled, ...accessibilityState }}
      disabled={disabled}
      style={resolveStyle}
      {...rest}
    />
  );
}
