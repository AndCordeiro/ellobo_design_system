import { useEffect, useState } from 'react';
import { Animated, View, type ViewProps } from 'react-native';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';

export type ProgressBarTone = 'brand' | 'success' | 'warning' | 'error' | 'info';

export interface ProgressBarProps extends ViewProps {
  /** Progress between 0 and 1. */
  value: number;
  /** Bar color. Defaults to `brand`. */
  tone?: ProgressBarTone;
  /** Track height. Defaults to `md` (8). */
  size?: 'sm' | 'md';
  /** Label rendered above the bar. */
  label?: string;
  /** Shows the percentage next to the label. */
  showValue?: boolean;
}

function clamp(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.min(1, Math.max(0, value));
}

/**
 * Determinate progress indicator.
 *
 * @example
 * <ProgressBar value={0.65} label="Enviando" showValue />
 */
export function ProgressBar({
  value,
  tone = 'brand',
  size = 'md',
  label,
  showValue = false,
  style,
  accessibilityLabel,
  ...rest
}: ProgressBarProps) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const progress = clamp(value);
  const [animated] = useState(() => new Animated.Value(progress));

  useEffect(() => {
    if (reducedMotion) {
      animated.setValue(progress);
      return;
    }
    Animated.timing(animated, {
      toValue: progress,
      duration: theme.motion.duration.normal,
      useNativeDriver: false,
    }).start();
  }, [animated, progress, reducedMotion, theme.motion.duration.normal]);

  const fillColor = tone === 'brand' ? theme.colors.action.primary : theme.colors.feedback[tone];
  const height = size === 'sm' ? 4 : 8;
  const percentage = Math.round(progress * 100);

  const width = animated.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityValue={{ min: 0, max: 100, now: percentage }}
      style={[{ gap: theme.spacing.xs }, style]}
      {...rest}
    >
      {label || showValue ? (
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          {label ? (
            <Text variant="labelMedium" color="secondary">
              {label}
            </Text>
          ) : (
            <View />
          )}
          {showValue ? (
            <Text variant="labelMedium" color="secondary">
              {`${percentage}%`}
            </Text>
          ) : null}
        </View>
      ) : null}
      <View
        style={{
          height,
          borderRadius: theme.radius.full,
          backgroundColor: theme.colors.background.tertiary,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          testID="progress-bar-fill"
          style={{ height, width, borderRadius: theme.radius.full, backgroundColor: fillColor }}
        />
      </View>
    </View>
  );
}
