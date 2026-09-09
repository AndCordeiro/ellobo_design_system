import { useState } from 'react';
import {
  ScrollView,
  type LayoutChangeEvent,
  type ScrollViewProps,
  type ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { LoadingOverlay } from '../../feedback/LoadingOverlay/LoadingOverlay';
import { useTheme } from '../../theme/useTheme';
import { ScreenRoot } from '../Screen/styles';
import type { ScrollScreenProps } from './types';

const ALL_EDGES: NonNullable<ScrollScreenProps['edges']> = ['top', 'bottom', 'left', 'right'];

/**
 * Scrollable counterpart of `Screen`. Header and footer stay fixed while the content scrolls.
 * With `keyboardAvoiding` (default) the focused field scrolls into view above the keyboard and
 * the footer sticks to the keyboard, so buttons are never covered.
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
  keyboardBottomOffset,
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
  const [footerHeight, setFooterHeight] = useState(0);
  const contentPadding: ViewStyle = { padding: theme.spacing[padding], flexGrow: 1 };
  const onFooterLayout = (event: LayoutChangeEvent) =>
    setFooterHeight(event.nativeEvent.layout.height);

  const scrollProps: ScrollViewProps = {
    style: { flex: 1 },
    contentContainerStyle: [contentPadding, contentStyle],
    keyboardShouldPersistTaps,
    showsVerticalScrollIndicator,
    scrollEnabled,
    refreshControl,
    onScroll,
    scrollEventThrottle: 16,
    ...scrollViewProps,
  };

  return (
    <ScreenRoot $background={background} edges={edges} {...rest}>
      {header}
      {keyboardAvoiding ? (
        <KeyboardAwareScrollView
          {...scrollProps}
          bottomOffset={(keyboardBottomOffset ?? theme.spacing.md) + footerHeight}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <ScrollView {...scrollProps}>{children}</ScrollView>
      )}
      {footer ? (
        keyboardAvoiding ? (
          <KeyboardStickyView onLayout={onFooterLayout}>{footer}</KeyboardStickyView>
        ) : (
          footer
        )
      ) : null}
      <LoadingOverlay visible={loading} message={loadingMessage} />
    </ScreenRoot>
  );
}
