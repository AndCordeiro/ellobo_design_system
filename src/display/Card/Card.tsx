import { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getCardStyle } from './styles';
import type { CardProps } from './types';

/**
 * Grouping surface for related content. Favors composition: place `Stack`, `Text`, `Row`…
 * inside it instead of configuring slots through props.
 *
 * @example
 * <Card variant="outlined">
 *   <Stack gap="sm">
 *     <Heading size="sm">Plano Pro</Heading>
 *     <Text color="secondary">R$ 49/mês</Text>
 *   </Stack>
 * </Card>
 */
export function Card({
  variant = 'elevated',
  padding,
  borderRadius,
  style,
  ref,
  ...rest
}: CardProps) {
  const theme = useTheme();
  const cardStyle = useMemo(
    () => getCardStyle(theme, variant, padding, borderRadius),
    [theme, variant, padding, borderRadius],
  );
  return <View ref={ref} style={[cardStyle, style]} {...rest} />;
}
