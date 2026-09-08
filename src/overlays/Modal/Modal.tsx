import {
  KeyboardAvoidingView,
  Modal as RNModal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from '../../components/IconButton/IconButton';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';
import { getElevationStyle } from '../../utils/styles';
import type { ModalProps, ModalSize } from './types';

const maxWidths: Record<ModalSize, number> = { sm: 360, md: 480, lg: 640 };

const styles = StyleSheet.create({
  root: { flex: 1 },
  backdrop: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottom: { flex: 1, justifyContent: 'flex-end' },
});

/**
 * Themed modal built on the native `Modal`. Handles backdrop, Android back button, safe area,
 * keyboard avoidance and accessibility focus.
 *
 * @example
 * <Modal visible={visible} onClose={close} title="Editar perfil">
 *   <Input label="Nome" />
 * </Modal>
 */
export function Modal({
  visible,
  onClose,
  title,
  children,
  footer,
  position = 'center',
  size = 'md',
  dismissOnBackdropPress = true,
  showCloseButton,
  closeLabel = 'Fechar',
  scrollable = true,
  avoidKeyboard = true,
  animationType,
  contentStyle,
  accessibilityLabel,
  testID,
}: ModalProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isBottom = position === 'bottom';
  const displayCloseButton = showCloseButton ?? Boolean(title);

  const containerStyle: ViewStyle = isBottom
    ? {
        width: '100%',
        maxHeight: '90%',
        borderTopLeftRadius: theme.radius.xl,
        borderTopRightRadius: theme.radius.xl,
        paddingBottom: Math.max(insets.bottom, theme.spacing.md),
        backgroundColor: theme.colors.background.elevated,
      }
    : {
        width: '100%',
        maxWidth: maxWidths[size],
        maxHeight: '85%',
        borderRadius: theme.radius.xl,
        marginHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.background.elevated,
      };

  const body = (
    <View
      accessibilityViewIsModal
      accessibilityLabel={accessibilityLabel ?? title}
      style={[containerStyle, getElevationStyle(theme, 'lg'), contentStyle]}
      testID={testID}
    >
      {title || displayCloseButton ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: theme.spacing.lg,
            paddingRight: displayCloseButton ? theme.spacing.sm : theme.spacing.lg,
            paddingTop: theme.spacing.md,
            paddingBottom: theme.spacing.sm,
            gap: theme.spacing.sm,
          }}
        >
          <View style={{ flex: 1 }}>
            {title ? (
              <Text variant="titleLarge" accessibilityRole="header">
                {title}
              </Text>
            ) : null}
          </View>
          {displayCloseButton ? (
            <IconButton
              icon="close"
              variant="ghost"
              size="sm"
              accessibilityLabel={closeLabel}
              onPress={onClose}
              testID="modal-close-button"
            />
          ) : null}
        </View>
      ) : null}
      {scrollable ? (
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.lg,
            paddingTop: title ? 0 : theme.spacing.lg,
            paddingBottom: footer ? theme.spacing.md : theme.spacing.lg,
          }}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={{
            paddingHorizontal: theme.spacing.lg,
            paddingTop: title ? 0 : theme.spacing.lg,
            paddingBottom: footer ? theme.spacing.md : theme.spacing.lg,
            flexShrink: 1,
          }}
        >
          {children}
        </View>
      )}
      {footer ? (
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.lg }}>
          {footer}
        </View>
      ) : null}
    </View>
  );

  return (
    <RNModal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType={animationType ?? (isBottom ? 'slide' : 'fade')}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled={avoidKeyboard}
      >
        <Pressable
          accessible={false}
          importantForAccessibility="no"
          onPress={dismissOnBackdropPress ? onClose : undefined}
          style={[styles.backdrop, { backgroundColor: theme.colors.background.overlay }]}
          testID="modal-backdrop"
        />
        <View pointerEvents="box-none" style={isBottom ? styles.bottom : styles.center}>
          {body}
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}
