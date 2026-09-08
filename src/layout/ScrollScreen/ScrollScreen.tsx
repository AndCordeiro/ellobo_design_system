import { KeyboardAvoidingView, Platform, ScrollView, type ViewStyle } from 'react-native';
import { LoadingOverlay } from '../../feedback/LoadingOverlay/LoadingOverlay';
import { useTheme } from '../../theme/useTheme';
import { ScreenRoot } from '../Screen/styles';
import type { ScrollScreenProps } from './types';

const ALL_EDGES: NonNullable<ScrollScreenProps['edges']> = ['top', 'bottom', 'left', 'right'];

/**
 * Scrollable counterpart of `Screen`. Header and footer stay fixed while the content scrolls.
 */
export function ScrollScreen({
  background = 'primary',
  padding = 'md',
  edges = ALL_EDGES,
  header,
  footer,
  loading = false,
  loadingMessage,
  keyboardAvoiding = true,
  contentStyle,
  children,
  refreshControl,
  keyboardShouldPersistTaps = 'handled',
  showsVerticalScrollIndicator = false,
  scrollEnabled = true,
  onScroll,
  scrollViewProps,
  ...rest
}: ScrollScreenProps) {
  const theme = useTheme();
  const contentPadding: ViewStyle = { padding: theme.spacing[padding], flexGrow: 1 };

  const body = (
    <>
      {header}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[contentPadding, contentStyle]}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        scrollEnabled={scrollEnabled}
        refreshControl={refreshControl}
        onScroll={onScroll}
        scrollEventThrottle={16}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
      {footer}
    </>
  );

  return (
    <ScreenRoot $background={background} edges={edges} {...rest}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {body}
        </KeyboardAvoidingView>
      ) : (
        body
      )}
      <LoadingOverlay visible={loading} message={loadingMessage} />
    </ScreenRoot>
  );
}
