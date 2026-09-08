import { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getBoxStyle } from './styles';
import type { BoxProps } from './types';

/**
 * Flexible layout primitive. Spacing, colors and radius are expressed with theme tokens.
 *
 * @example
 * <Box padding="md" background="secondary" borderRadius="lg" />
 */
export function Box({
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  flex,
  direction,
  align,
  justify,
  alignSelf,
  wrap,
  gap,
  width,
  height,
  minHeight,
  background,
  borderRadius,
  borderWidth,
  borderColor,
  overflowHidden,
  style,
  ref,
  ...rest
}: BoxProps) {
  const theme = useTheme();

  const boxStyle = useMemo(
    () =>
      getBoxStyle(theme, {
        padding,
        paddingHorizontal,
        paddingVertical,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        margin,
        marginHorizontal,
        marginVertical,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        flex,
        direction,
        align,
        justify,
        alignSelf,
        wrap,
        gap,
        width,
        height,
        minHeight,
        background,
        borderRadius,
        borderWidth,
        borderColor,
        overflowHidden,
      }),
    [
      theme,
      padding,
      paddingHorizontal,
      paddingVertical,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      flex,
      direction,
      align,
      justify,
      alignSelf,
      wrap,
      gap,
      width,
      height,
      minHeight,
      background,
      borderRadius,
      borderWidth,
      borderColor,
      overflowHidden,
    ],
  );

  return <View ref={ref} style={[boxStyle, style]} {...rest} />;
}
