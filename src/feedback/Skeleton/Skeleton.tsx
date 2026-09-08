import { useEffect, useState } from 'react';
import { Animated, type DimensionValue, type ViewProps } from 'react-native';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { RadiusToken } from '../../tokens/radius';
import { useTheme } from '../../theme/useTheme';

export interface SkeletonProps extends ViewProps {
  /** Width (number or percentage). Defaults to `100%`. */
  width?: DimensionValue;
  /** Height in pixels. Defaults to 16. */
  height?: number;
  /** Corner radius token. Defaults to `sm`. */
  radius?: RadiusToken;
  /** Renders a circle using `height` as the diameter. */
  circle?: boolean;
  /** Disables the pulse animation. Automatically disabled when Reduce Motion is on. */
  animated?: boolean;
}

/**
 * Placeholder that mimics content while it loads, with a light pulse animation.
 *
 * @example
 * <Skeleton width="60%" height={20} />
 * <Skeleton circle height={40} />
 */
export function Skeleton({
  width = '100%',
  height = 16,
  radius = 'sm',
  circle = false,
  animated = true,
  style,
  ...rest
}: SkeletonProps) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const [opacity] = useState(() => new Animated.Value(1));
  const shouldAnimate = animated && !reducedMotion;

  useEffect(() => {
    if (!shouldAnimate) {
      opacity.setValue(1);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: theme.opacity.skeleton,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();

    return () => loop.stop();
  }, [opacity, shouldAnimate, theme.opacity.skeleton]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width: circle ? height : width,
          height,
          borderRadius: circle ? theme.radius.full : theme.radius[radius],
          backgroundColor: theme.colors.background.tertiary,
          opacity,
        },
        style,
      ]}
      {...rest}
    />
  );
}
