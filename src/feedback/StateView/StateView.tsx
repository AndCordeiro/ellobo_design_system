import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../icons/Icon/Icon';
import type { IconName } from '../../icons/Icon/icons';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';

export type StateViewTone = 'neutral' | 'error' | 'success';

export interface StateViewProps extends ViewProps {
  icon?: IconName;
  /** Custom illustration or element rendered instead of the icon. */
  illustration?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  /** Shows the action button in a loading state. */
  actionLoading?: boolean;
  tone?: StateViewTone;
  /** Extra content rendered under the actions. */
  children?: ReactNode;
}

/**
 * Shared layout of `EmptyState`, `ErrorState` and `SuccessState`.
 */
export function StateView({
  icon,
  illustration,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  actionLoading = false,
  tone = 'neutral',
  children,
  style,
  ...rest
}: StateViewProps) {
  const theme = useTheme();

  const iconBackground =
    tone === 'error'
      ? theme.colors.feedback.errorBackground
      : tone === 'success'
        ? theme.colors.feedback.successBackground
        : theme.colors.background.tertiary;

  const iconColor =
    tone === 'error'
      ? theme.colors.feedback.error
      : tone === 'success'
        ? theme.colors.feedback.success
        : theme.colors.content.secondary;

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.xl,
          gap: theme.spacing[3],
        },
        style,
      ]}
      {...rest}
    >
      {illustration ??
        (icon ? (
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: theme.radius.full,
              backgroundColor: iconBackground,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.xs,
            }}
          >
            <Icon name={icon} size={28} color={iconColor} />
          </View>
        ) : null)}
      <Text variant="titleLarge" align="center">
        {title}
      </Text>
      {description ? (
        <Text variant="bodyMedium" color="secondary" align="center" style={{ maxWidth: 320 }}>
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <View style={{ marginTop: theme.spacing.sm, alignItems: 'center', gap: theme.spacing.sm }}>
          <Button variant="primary" onPress={onAction} loading={actionLoading}>
            {actionLabel}
          </Button>
          {secondaryActionLabel && onSecondaryAction ? (
            <Button variant="ghost" onPress={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}
