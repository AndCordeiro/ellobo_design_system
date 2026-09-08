import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { DesignSystemTheme } from '../../theme/types';
import { Text } from '../../typography/Text/Text';

export type StatusBadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface StatusBadgeProps extends ViewProps {
  /** Status text. */
  label: string;
  /** Status tone. Defaults to `neutral`. */
  variant?: StatusBadgeVariant;
  /** Hides the leading dot. */
  hideDot?: boolean;
}

export function getStatusBadgeColors(theme: DesignSystemTheme, variant: StatusBadgeVariant) {
  if (variant === 'neutral') {
    return {
      background: theme.colors.background.tertiary,
      dot: theme.colors.content.tertiary,
      content: theme.colors.content.secondary,
    };
  }
  return {
    background: theme.colors.feedback[`${variant}Background`],
    dot: theme.colors.feedback[variant],
    content: theme.colors.feedback[`${variant}Content`],
  };
}

/**
 * Status indicator with a colored dot and label (e.g. "Ativo", "Pendente", "Falhou").
 *
 * @example
 * <StatusBadge variant="success" label="Ativo" />
 */
export function StatusBadge({
  label,
  variant = 'neutral',
  hideDot = false,
  style,
  ...rest
}: StatusBadgeProps) {
  const theme = useTheme();
  const colors = getStatusBadgeColors(theme, variant);

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2] - 2,
    paddingHorizontal: theme.spacing[2] + 2,
    height: 26,
    borderRadius: theme.radius.full,
    backgroundColor: colors.background,
    alignSelf: 'flex-start',
  };

  return (
    <View accessible accessibilityLabel={label} style={[containerStyle, style]} {...rest}>
      {hideDot ? null : (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: theme.radius.full,
            backgroundColor: colors.dot,
          }}
        />
      )}
      <Text
        variant="labelMedium"
        weight="semibold"
        style={{ color: colors.content }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}
