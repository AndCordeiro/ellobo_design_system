import { useCallback, useState } from 'react';
import { Image, View, type ViewStyle } from 'react-native';
import { Icon } from '../../icons/Icon/Icon';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';
import type { AvatarProps, AvatarSize } from './types';

export const avatarSizes: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80 };

const fontVariants = {
  xs: 'labelSmall',
  sm: 'labelMedium',
  md: 'labelLarge',
  lg: 'titleLarge',
  xl: 'headingMedium',
} as const;

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '';
  }
  const first = parts[0]?.charAt(0) ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? '') : '';
  return `${first}${last}`.toUpperCase();
}

/**
 * User or entity avatar with image, initials and icon fallbacks.
 *
 * @example
 * <Avatar source={{ uri: user.photo }} name={user.name} size="lg" />
 */
export function Avatar({
  source,
  name,
  fallback,
  size = 'md',
  shape = 'circle',
  style,
  accessibilityLabel,
  ...rest
}: AvatarProps) {
  const theme = useTheme();
  // Tracks which source failed so a new `source` automatically retries the image.
  const [failedSource, setFailedSource] = useState<AvatarProps['source'] | null>(null);
  const dimension = avatarSizes[size];
  const failed = source !== undefined && failedSource === source;

  const handleError = useCallback(() => setFailedSource(source), [source]);

  const initials = fallback ?? (name ? getInitials(name) : '');
  const showImage = Boolean(source) && !failed;

  const containerStyle: ViewStyle = {
    width: dimension,
    height: dimension,
    borderRadius: shape === 'circle' ? theme.radius.full : theme.radius.md,
    backgroundColor: theme.colors.background.brandSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? name ?? initials}
      style={[containerStyle, style]}
      {...rest}
    >
      {showImage ? (
        <Image
          source={source as NonNullable<AvatarProps['source']>}
          onError={handleError}
          style={{ width: dimension, height: dimension }}
          accessibilityIgnoresInvertColors
        />
      ) : initials ? (
        <Text variant={fontVariants[size]} weight="semibold" color="brand" allowFontScaling={false}>
          {initials.slice(0, 2)}
        </Text>
      ) : (
        <Icon name="user" size={Math.round(dimension * 0.5)} color="brand" />
      )}
    </View>
  );
}
