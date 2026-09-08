import styled from 'styled-components/native';
import type { FontWeightKey, TypographyVariantName } from '../../tokens/typography';
import type { DesignSystemTheme } from '../../theme/types';
import { getTypographyStyle, resolveTextColor, type TextColorToken } from '../../utils/styles';
import type { TextAlign } from './types';

export interface StyledTextProps {
  $variant: TypographyVariantName;
  $color: TextColorToken;
  $weight?: FontWeightKey;
  $align?: TextAlign;
}

export function typographyCss(
  theme: DesignSystemTheme,
  variant: TypographyVariantName,
  weight?: FontWeightKey,
): string {
  const style = getTypographyStyle(theme, variant, weight);
  const declarations = [
    `font-size: ${style.fontSize}px;`,
    `line-height: ${style.lineHeight}px;`,
    `letter-spacing: ${style.letterSpacing}px;`,
  ];
  if (style.fontFamily) {
    declarations.push(`font-family: ${style.fontFamily};`);
  }
  if (style.fontWeight) {
    declarations.push(`font-weight: ${style.fontWeight};`);
  }
  return declarations.join('\n');
}

export const StyledText = styled.Text<StyledTextProps>`
  ${({ theme, $variant, $weight }) => typographyCss(theme, $variant, $weight)}
  color: ${({ theme, $color }) => resolveTextColor(theme, $color)};
  ${({ $align }) => ($align ? `text-align: ${$align};` : '')}
`;
