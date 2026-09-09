/**
 * Keyboard handling shared by every app built on the Design System. Backed by
 * `react-native-keyboard-controller`; the app must wrap its root with `KeyboardProvider`.
 *
 * - `Screen` / `ScrollScreen` already keep the focused field and the footer above the keyboard.
 * - `KeyboardStickyView` pins any custom footer to the keyboard.
 * - `KeyboardController.dismiss()` closes the keyboard programmatically.
 */
export {
  KeyboardProvider,
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
  KeyboardStickyView,
  KeyboardController,
  useKeyboardState,
} from 'react-native-keyboard-controller';
