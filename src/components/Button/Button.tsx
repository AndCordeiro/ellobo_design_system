import { useCallback, type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type PressableStateCallbackType } from 'react-native';
import { ActivityIndicator } from '../../feedback/ActivityIndicator/ActivityIndicator';
import { Icon } from '../../icons/Icon/Icon';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';
import { getButtonStyles } from './styles';
import type { ButtonProps } from './types';

const styles = StyleSheet.create({
  hidden: { opacity: 0 },
  spinner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function deriveLabel(children: ReactNode): string | undefined {
  return typeof children === 'string' || typeof children === 'number'
    ? String(children)
    : undefined;
}

/**
 * Primary action component.
 *
 * @example
 * <Button variant="primary" size="lg" leftIcon="plus" loading={saving} fullWidth>
 *   Criar conta
 * </Button>
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityState,
  onPress,
  ref,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const isInteractionBlocked = disabled || loading;

  const resolveStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      getButtonStyles(theme, {
        variant,
        size,
        disabled,
        pressed: pressed && !isInteractionBlocked,
        fullWidth,
      }).container,
      style,
    ],
    [theme, variant, size, disabled, isInteractionBlocked, fullWidth, style],
  );

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? deriveLabel(children)}
      accessibilityState={{ disabled: isInteractionBlocked, busy: loading, ...accessibilityState }}
      disabled={isInteractionBlocked}
      onPress={isInteractionBlocked ? undefined : onPress}
      style={resolveStyle}
      {...rest}
    >
      {({ pressed }) => {
        const resolved = getButtonStyles(theme, {
          variant,
          size,
          disabled,
          pressed: pressed && !isInteractionBlocked,
          fullWidth,
        });
        const contentStyle = loading ? styles.hidden : undefined;

        return (
          <>
            {leftIcon ? (
              <View style={contentStyle}>
                <Icon name={leftIcon} size={resolved.iconSize} color={resolved.contentColor} />
              </View>
            ) : null}
            {typeof children === 'string' || typeof children === 'number' ? (
              <Text
                variant={resolved.typography}
                weight="semibold"
                numberOfLines={1}
                maxFontSizeMultiplier={1.5}
                style={[resolved.label, contentStyle, textStyle]}
              >
                {children}
              </Text>
            ) : (
              <View style={contentStyle}>{children}</View>
            )}
            {rightIcon ? (
              <View style={contentStyle}>
                <Icon name={rightIcon} size={resolved.iconSize} color={resolved.contentColor} />
              </View>
            ) : null}
            {loading ? (
              <View style={styles.spinner} pointerEvents="none">
                <ActivityIndicator
                  size="sm"
                  color={resolved.contentColor}
                  style={{ transform: [{ scale: size === 'sm' ? 0.85 : 1 }] }}
                  accessibilityLabel="Carregando"
                  testID="button-loading-indicator"
                />
              </View>
            ) : null}
          </>
        );
      }}
    </Pressable>
  );
}
