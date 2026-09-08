import type { ReactNode } from 'react';
import type { ModalProps as RNModalProps, StyleProp, ViewStyle } from 'react-native';

export type ModalPosition = 'center' | 'bottom';
export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  visible: boolean;
  /** Called by the close button, backdrop press and the Android back button. */
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  /** Rendered under the content, outside of the scroll area (e.g. action buttons). */
  footer?: ReactNode;
  /** `center` (dialog) or `bottom` (sheet). Defaults to `center`. */
  position?: ModalPosition;
  /** Max width of centered modals. Defaults to `md`. */
  size?: ModalSize;
  /** Closes when the backdrop is pressed. Defaults to `true`. */
  dismissOnBackdropPress?: boolean;
  /** Shows the close button in the header. Defaults to `true` when a title is present. */
  showCloseButton?: boolean;
  closeLabel?: string;
  /** Wraps the content in a `ScrollView`. Defaults to `true`. */
  scrollable?: boolean;
  /** Avoids the keyboard on iOS. Defaults to `true`. */
  avoidKeyboard?: boolean;
  animationType?: RNModalProps['animationType'];
  /** Style of the sheet/dialog container. */
  contentStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
}
