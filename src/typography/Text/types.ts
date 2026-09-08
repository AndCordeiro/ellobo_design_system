import type { ReactNode, Ref } from 'react';
import type { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import type { FontWeightKey, TypographyVariantName } from '../../tokens/typography';
import type { TextColorToken } from '../../utils/styles';

export type TextAlign = NonNullable<TextStyle['textAlign']>;

export interface TextProps extends RNTextProps {
  /** Typography variant from the theme scale. Defaults to `bodyMedium`. */
  variant?: TypographyVariantName;
  /** Semantic color token. Defaults to `primary`. */
  color?: TextColorToken;
  /** Overrides the weight defined by the variant. */
  weight?: FontWeightKey;
  /** Text alignment. */
  align?: TextAlign;
  children?: ReactNode;
  ref?: Ref<RNText>;
}
