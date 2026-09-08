import type { ReactNode, Ref } from 'react';
import type { DimensionValue, FlexStyle, View, ViewProps } from 'react-native';
import type { RadiusToken } from '../../tokens/radius';
import type { SpacingToken } from '../../tokens/spacing';
import type { BackgroundColorToken, BorderColorToken } from '../../theme/types';

export type FlexAlign = NonNullable<FlexStyle['alignItems']>;
export type FlexJustify = NonNullable<FlexStyle['justifyContent']>;
export type FlexDirection = 'row' | 'column';

export interface BoxSpacingProps {
  padding?: SpacingToken;
  paddingHorizontal?: SpacingToken;
  paddingVertical?: SpacingToken;
  paddingTop?: SpacingToken;
  paddingBottom?: SpacingToken;
  paddingLeft?: SpacingToken;
  paddingRight?: SpacingToken;
  margin?: SpacingToken;
  marginHorizontal?: SpacingToken;
  marginVertical?: SpacingToken;
  marginTop?: SpacingToken;
  marginBottom?: SpacingToken;
  marginLeft?: SpacingToken;
  marginRight?: SpacingToken;
}

export interface BoxLayoutProps {
  flex?: number;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  alignSelf?: NonNullable<FlexStyle['alignSelf']>;
  wrap?: boolean;
  gap?: SpacingToken;
  width?: DimensionValue;
  height?: DimensionValue;
  minHeight?: DimensionValue;
}

export interface BoxAppearanceProps {
  background?: BackgroundColorToken;
  borderRadius?: RadiusToken;
  borderWidth?: number;
  borderColor?: BorderColorToken;
  /** Clips children to the border radius. */
  overflowHidden?: boolean;
}

export interface BoxProps extends ViewProps, BoxSpacingProps, BoxLayoutProps, BoxAppearanceProps {
  children?: ReactNode;
  ref?: Ref<View>;
}
