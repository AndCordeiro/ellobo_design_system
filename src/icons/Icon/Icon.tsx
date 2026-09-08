import { useMemo } from 'react';
import Svg, { Circle, Line, Path, Polygon, Polyline, Rect } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { isTextColorToken, resolveTextColor } from '../../utils/styles';
import { icons, type IconShape } from './icons';
import type { IconProps, IconSize } from './types';

export const iconSizes: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

function renderShape(shape: IconShape, index: number) {
  switch (shape.type) {
    case 'path':
      return <Path key={index} d={shape.d} />;
    case 'line':
      return <Line key={index} x1={shape.x1} y1={shape.y1} x2={shape.x2} y2={shape.y2} />;
    case 'circle':
      return <Circle key={index} cx={shape.cx} cy={shape.cy} r={shape.r} />;
    case 'polyline':
      return <Polyline key={index} points={shape.points} />;
    case 'polygon':
      return <Polygon key={index} points={shape.points} />;
    case 'rect':
      return (
        <Rect
          key={index}
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          rx={shape.rx}
          ry={shape.rx}
        />
      );
    default:
      return null;
  }
}

/**
 * Vector icon rendered from the built-in, strongly-typed icon set.
 *
 * @example
 * <Icon name="home" size="md" color="brand" />
 */
export function Icon({
  name,
  size = 'md',
  color = 'primary',
  strokeWidth = 2,
  accessibilityLabel,
  ...rest
}: IconProps) {
  const theme = useTheme();
  const pixelSize = typeof size === 'number' ? size : iconSizes[size];
  const strokeColor = isTextColorToken(color) ? resolveTextColor(theme, color) : color;
  const shapes = icons[name];

  const children = useMemo(() => shapes.map(renderShape), [shapes]);

  const accessibilityProps = accessibilityLabel
    ? { accessible: true, accessibilityRole: 'image' as const, accessibilityLabel }
    : {
        accessible: false,
        accessibilityElementsHidden: true,
        importantForAccessibility: 'no-hide-descendants' as const,
      };

  return (
    <Svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...accessibilityProps}
      {...rest}
    >
      {children}
    </Svg>
  );
}
