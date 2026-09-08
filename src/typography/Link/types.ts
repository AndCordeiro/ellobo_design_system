import type { TextProps } from '../Text/types';

export interface LinkProps extends TextProps {
  /** Disables interaction and applies the disabled color. */
  disabled?: boolean;
  /** Renders the text underlined. Defaults to `false`. */
  underline?: boolean;
}
