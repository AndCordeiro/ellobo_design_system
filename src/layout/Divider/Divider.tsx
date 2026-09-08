import styled from 'styled-components/native';
import type { ViewProps } from 'react-native';
import type { SpacingToken } from '../../tokens/spacing';

export type DividerColor = 'primary' | 'secondary' | 'strong';

export interface DividerProps extends ViewProps {
  /** `horizontal` (default) spans the width; `vertical` stretches to the parent height. */
  orientation?: 'horizontal' | 'vertical';
  /** Border color token. Defaults to `primary`. */
  color?: DividerColor;
  /** Line thickness in pixels. Defaults to 1. */
  thickness?: number;
  /** Margin applied along the cross axis (vertical margin for horizontal dividers). */
  spacing?: SpacingToken;
  /** Inset applied at the start of the line (e.g. to align with list content). */
  inset?: SpacingToken;
}

interface StyledDividerProps {
  $orientation: 'horizontal' | 'vertical';
  $color: DividerColor;
  $thickness: number;
  $spacing?: SpacingToken;
  $inset?: SpacingToken;
}

const StyledDivider = styled.View<StyledDividerProps>`
  background-color: ${({ theme, $color }) => theme.colors.border[$color]};
  ${({ $orientation, $thickness }) =>
    $orientation === 'horizontal'
      ? `height: ${$thickness}px; align-self: stretch;`
      : `width: ${$thickness}px; align-self: stretch;`}
  ${({ theme, $orientation, $spacing }) =>
    $spacing === undefined
      ? ''
      : $orientation === 'horizontal'
        ? `margin-vertical: ${theme.spacing[$spacing]}px;`
        : `margin-horizontal: ${theme.spacing[$spacing]}px;`}
  ${({ theme, $orientation, $inset }) =>
    $inset === undefined
      ? ''
      : $orientation === 'horizontal'
        ? `margin-left: ${theme.spacing[$inset]}px;`
        : `margin-top: ${theme.spacing[$inset]}px;`}
`;

/**
 * Thin separator line using border tokens.
 */
export function Divider({
  orientation = 'horizontal',
  color = 'primary',
  thickness = 1,
  spacing,
  inset,
  ...rest
}: DividerProps) {
  return (
    <StyledDivider
      accessibilityElementsHidden
      importantForAccessibility="no"
      $orientation={orientation}
      $color={color}
      $thickness={thickness}
      $spacing={spacing}
      $inset={inset}
      {...rest}
    />
  );
}
