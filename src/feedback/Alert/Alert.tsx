import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { IconButton } from '../../components/IconButton/IconButton';
import { Icon } from '../../icons/Icon/Icon';
import type { IconName } from '../../icons/Icon/icons';
import { useTheme } from '../../theme/useTheme';
import type { FeedbackTone } from '../../theme/types';
import { Link } from '../../typography/Link/Link';
import { Text } from '../../typography/Text/Text';

export type AlertVariant = FeedbackTone;

export interface AlertAction {
  label: string;
  onPress: () => void;
}

export interface AlertProps extends ViewProps {
  /** Tone of the message. Defaults to `info`. */
  variant?: AlertVariant;
  title?: string;
  /** Message body. Strings are rendered with the alert typography. */
  children?: ReactNode;
  /** Overrides the default tone icon. */
  icon?: IconName;
  /** Optional inline action rendered under the message. */
  action?: AlertAction;
  /** When provided, renders a close button that calls this handler. */
  onDismiss?: () => void;
  dismissLabel?: string;
}

const defaultIcons: Record<AlertVariant, IconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

/**
 * Contextual message for information, success, warnings and errors.
 *
 * @example
 * <Alert variant="warning" title="Atenção">
 *   Sua sessão expira em 5 minutos.
 * </Alert>
 */
export function Alert({
  variant = 'info',
  title,
  children,
  icon,
  action,
  onDismiss,
  dismissLabel = 'Fechar',
  style,
  ...rest
}: AlertProps) {
  const theme = useTheme();
  const toneColor = theme.colors.feedback[variant];
  const contentColor = theme.colors.feedback[`${variant}Content`];

  return (
    <View
      accessibilityRole="alert"
      style={[
        {
          flexDirection: 'row',
          gap: theme.spacing[3],
          padding: theme.spacing[4],
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.feedback[`${variant}Background`],
        },
        style,
      ]}
      {...rest}
    >
      <View style={{ paddingTop: 1 }}>
        <Icon name={icon ?? defaultIcons[variant]} size="md" color={toneColor} />
      </View>
      <View style={{ flex: 1, gap: theme.spacing.xs }}>
        {title ? (
          <Text variant="titleSmall" style={{ color: contentColor }}>
            {title}
          </Text>
        ) : null}
        {typeof children === 'string' ? (
          <Text variant="bodySmall" style={{ color: contentColor }}>
            {children}
          </Text>
        ) : (
          children
        )}
        {action ? (
          <Link
            variant="labelLarge"
            onPress={action.onPress}
            style={{ color: contentColor, marginTop: theme.spacing.xs }}
          >
            {action.label}
          </Link>
        ) : null}
      </View>
      {onDismiss ? (
        <IconButton
          icon="close"
          size="sm"
          variant="ghost"
          accessibilityLabel={dismissLabel}
          onPress={onDismiss}
          style={{ marginTop: -6, marginRight: -6 }}
          testID="alert-dismiss-button"
        />
      ) : null}
    </View>
  );
}
