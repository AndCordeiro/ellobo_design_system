import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Icon } from '../../icons/Icon/Icon';
import type { IconName } from '../../icons/Icon/icons';
import { useTheme } from '../../theme/useTheme';
import type { FeedbackTone } from '../../theme/types';
import { Text } from '../../typography/Text/Text';
import { Modal } from '../Modal/Modal';
import type { ModalProps } from '../Modal/types';

export interface DialogProps extends Pick<
  ModalProps,
  'visible' | 'onClose' | 'dismissOnBackdropPress' | 'testID' | 'size'
> {
  title: string;
  description?: string;
  /** Optional leading icon with a feedback tone. */
  icon?: IconName;
  iconTone?: FeedbackTone | 'brand';
  /** Extra content between the description and the actions. */
  children?: ReactNode;
  /** Action buttons. Rendered in a row aligned to the end. */
  actions?: ReactNode;
  /** Stacks the actions vertically at full width. */
  stackActions?: boolean;
}

/**
 * Centered dialog for short decisions and messages.
 *
 * @example
 * <Dialog
 *   visible={visible}
 *   onClose={close}
 *   title="Sessão expirada"
 *   description="Entre novamente para continuar."
 *   actions={<Button onPress={close}>Entendi</Button>}
 * />
 */
export function Dialog({
  visible,
  onClose,
  title,
  description,
  icon,
  iconTone = 'brand',
  children,
  actions,
  stackActions = false,
  dismissOnBackdropPress = true,
  size = 'sm',
  testID,
}: DialogProps) {
  const theme = useTheme();

  const iconBackground =
    iconTone === 'brand'
      ? theme.colors.background.brandSubtle
      : theme.colors.feedback[`${iconTone}Background`];
  const iconColor =
    iconTone === 'brand' ? theme.colors.content.brand : theme.colors.feedback[iconTone];

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      size={size}
      showCloseButton={false}
      dismissOnBackdropPress={dismissOnBackdropPress}
      scrollable={false}
      accessibilityLabel={title}
      testID={testID}
      footer={
        actions ? (
          <View
            style={{
              flexDirection: stackActions ? 'column-reverse' : 'row',
              justifyContent: 'flex-end',
              gap: theme.spacing.sm,
            }}
          >
            {actions}
          </View>
        ) : undefined
      }
    >
      <View style={{ gap: theme.spacing.sm }}>
        {icon ? (
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: theme.radius.full,
              backgroundColor: iconBackground,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.xs,
            }}
          >
            <Icon name={icon} size="lg" color={iconColor} />
          </View>
        ) : null}
        <Text variant="titleLarge" accessibilityRole="header">
          {title}
        </Text>
        {description ? (
          <Text variant="bodyMedium" color="secondary">
            {description}
          </Text>
        ) : null}
        {children}
      </View>
    </Modal>
  );
}
