import { Modal, StyleSheet, View, type ViewProps } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';
import { getElevationStyle } from '../../utils/styles';
import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';

export interface LoadingOverlayProps extends ViewProps {
  visible: boolean;
  /** Optional message under the spinner. */
  message?: string;
  /** Dims the covered area. Defaults to `true`. */
  backdrop?: boolean;
  /**
   * Renders in a native modal so the overlay covers the whole app (including headers and tab
   * bars). Defaults to `false`, covering only the parent container.
   */
  fullscreen?: boolean;
}

const styles = StyleSheet.create({
  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Blocking loading state layered over a screen or area. Touches beneath it are blocked and
 * screen readers announce the loading message.
 */
export function LoadingOverlay({
  visible,
  message,
  backdrop = true,
  fullscreen = false,
  style,
  ...rest
}: LoadingOverlayProps) {
  const theme = useTheme();

  if (!visible) {
    return null;
  }

  const content = (
    <View
      accessibilityViewIsModal
      accessibilityLiveRegion="polite"
      accessible
      accessibilityLabel={message ?? 'Carregando'}
      pointerEvents="auto"
      style={[
        styles.fill,
        backdrop ? { backgroundColor: theme.colors.background.overlay } : null,
        style,
      ]}
      {...rest}
    >
      <View
        style={[
          {
            minWidth: 96,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.lg,
            borderRadius: theme.radius.lg,
            backgroundColor: theme.colors.background.elevated,
            alignItems: 'center',
            gap: theme.spacing[3],
          },
          getElevationStyle(theme, 'md'),
        ]}
      >
        <ActivityIndicator size="lg" />
        {message ? (
          <Text variant="bodyMedium" color="secondary" align="center">
            {message}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (fullscreen) {
    return (
      <Modal
        visible
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => undefined}
      >
        {content}
      </Modal>
    );
  }

  return content;
}
