import type { ScrollViewProps } from 'react-native';
import type { ScreenBaseProps } from '../Screen/types';

export interface ScrollScreenProps extends ScreenBaseProps {
  /** Pull-to-refresh control, forwarded to the underlying `ScrollView`. */
  refreshControl?: ScrollViewProps['refreshControl'];
  /** Defaults to `handled` so taps dismiss the keyboard without swallowing button presses. */
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
  showsVerticalScrollIndicator?: boolean;
  scrollEnabled?: boolean;
  onScroll?: ScrollViewProps['onScroll'];
  /** Escape hatch for any other `ScrollView` prop. */
  scrollViewProps?: Omit<
    ScrollViewProps,
    | 'refreshControl'
    | 'keyboardShouldPersistTaps'
    | 'showsVerticalScrollIndicator'
    | 'scrollEnabled'
    | 'onScroll'
    | 'contentContainerStyle'
  >;
}
