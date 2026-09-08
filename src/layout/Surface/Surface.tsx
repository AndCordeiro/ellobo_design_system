import { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getElevationStyle } from '../../utils/styles';
import type { SurfaceProps } from './types';

/**
 * Elevated or grouped area. Base building block of `Card`, dialogs and overlays.
 */
export function Surface({
  elevation = 'none',
  background = 'elevated',
  borderRadius = 'lg',
  padding = 'none',
  bordered = false,
  style,
  ref,
  ...rest
}: SurfaceProps) {
  const theme = useTheme();

  const surfaceStyle = useMemo(
    () => [
      {
        backgroundColor: theme.colors.background[background],
        borderRadius: theme.radius[borderRadius],
        padding: theme.spacing[padding],
        borderWidth: bordered ? 1 : 0,
        borderColor: theme.colors.border.primary,
      },
      getElevationStyle(theme, elevation),
    ],
    [theme, background, borderRadius, padding, bordered, elevation],
  );

  return <View ref={ref} style={[surfaceStyle, style]} {...rest} />;
}
