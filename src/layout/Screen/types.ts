import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import type { SpacingToken } from '../../tokens/spacing';
import type { BackgroundColorToken } from '../../theme/types';

export interface ScreenBaseProps extends ViewProps {
  /** Background token. Defaults to `primary`. */
  background?: BackgroundColorToken;
  /** Padding applied to the content area. Defaults to `md`. */
  padding?: SpacingToken;
  /** Safe-area edges honoured by the screen. Defaults to all edges. */
  edges?: Edge[];
  /** Rendered above the content, outside of the content padding (e.g. `<Header />`). */
  header?: ReactNode;
  /** Rendered below the content, outside of the content padding (e.g. a sticky `<Button />`). */
  footer?: ReactNode;
  /** Shows a blocking `LoadingOverlay` on top of the screen. */
  loading?: boolean;
  /** Message displayed by the loading overlay. */
  loadingMessage?: string;
  /** Wraps content in a `KeyboardAvoidingView`. Defaults to `true`. */
  keyboardAvoiding?: boolean;
  /** Style applied to the content container. */
  contentStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export type ScreenProps = ScreenBaseProps;
