import type { ViewStyle } from 'react-native';
import type { DesignSystemTheme } from '../../theme/types';
import type { BoxAppearanceProps, BoxLayoutProps, BoxSpacingProps } from './types';

export type BoxStyleProps = BoxSpacingProps & BoxLayoutProps & BoxAppearanceProps;

/**
 * Translates Box props into a React Native style object using theme tokens.
 */
export function getBoxStyle(theme: DesignSystemTheme, props: BoxStyleProps): ViewStyle {
  const { spacing } = theme;
  const style: ViewStyle = {};

  if (props.padding !== undefined) style.padding = spacing[props.padding];
  if (props.paddingHorizontal !== undefined)
    style.paddingHorizontal = spacing[props.paddingHorizontal];
  if (props.paddingVertical !== undefined) style.paddingVertical = spacing[props.paddingVertical];
  if (props.paddingTop !== undefined) style.paddingTop = spacing[props.paddingTop];
  if (props.paddingBottom !== undefined) style.paddingBottom = spacing[props.paddingBottom];
  if (props.paddingLeft !== undefined) style.paddingLeft = spacing[props.paddingLeft];
  if (props.paddingRight !== undefined) style.paddingRight = spacing[props.paddingRight];

  if (props.margin !== undefined) style.margin = spacing[props.margin];
  if (props.marginHorizontal !== undefined)
    style.marginHorizontal = spacing[props.marginHorizontal];
  if (props.marginVertical !== undefined) style.marginVertical = spacing[props.marginVertical];
  if (props.marginTop !== undefined) style.marginTop = spacing[props.marginTop];
  if (props.marginBottom !== undefined) style.marginBottom = spacing[props.marginBottom];
  if (props.marginLeft !== undefined) style.marginLeft = spacing[props.marginLeft];
  if (props.marginRight !== undefined) style.marginRight = spacing[props.marginRight];

  if (props.flex !== undefined) style.flex = props.flex;
  if (props.direction !== undefined) style.flexDirection = props.direction;
  if (props.align !== undefined) style.alignItems = props.align;
  if (props.justify !== undefined) style.justifyContent = props.justify;
  if (props.alignSelf !== undefined) style.alignSelf = props.alignSelf;
  if (props.wrap) style.flexWrap = 'wrap';
  if (props.gap !== undefined) style.gap = spacing[props.gap];
  if (props.width !== undefined) style.width = props.width;
  if (props.height !== undefined) style.height = props.height;
  if (props.minHeight !== undefined) style.minHeight = props.minHeight;

  if (props.background !== undefined)
    style.backgroundColor = theme.colors.background[props.background];
  if (props.borderRadius !== undefined) style.borderRadius = theme.radius[props.borderRadius];
  if (props.borderWidth !== undefined) style.borderWidth = props.borderWidth;
  if (props.borderColor !== undefined) {
    style.borderColor = theme.colors.border[props.borderColor];
    if (props.borderWidth === undefined) style.borderWidth = 1;
  }
  if (props.overflowHidden) style.overflow = 'hidden';

  return style;
}
