import { useCallback, useState } from 'react';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { LinkProps } from './types';

/**
 * Inline text link. The consumer provides the navigation/linking behaviour through `onPress`.
 *
 * @example
 * <Link onPress={openTerms}>Termos de uso</Link>
 */
export function Link({
  disabled = false,
  underline = false,
  onPress,
  onPressIn,
  onPressOut,
  style,
  weight = 'medium',
  color = 'brand',
  ...rest
}: LinkProps) {
  const theme = useTheme();
  const [pressed, setPressed] = useState(false);

  const handlePressIn = useCallback<NonNullable<LinkProps['onPressIn']>>(
    (event) => {
      setPressed(true);
      onPressIn?.(event);
    },
    [onPressIn],
  );

  const handlePressOut = useCallback<NonNullable<LinkProps['onPressOut']>>(
    (event) => {
      setPressed(false);
      onPressOut?.(event);
    },
    [onPressOut],
  );

  return (
    <Text
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      suppressHighlighting
      color={disabled ? 'disabled' : color}
      weight={weight}
      onPress={disabled ? undefined : onPress}
      onPressIn={disabled ? undefined : handlePressIn}
      onPressOut={disabled ? undefined : handlePressOut}
      style={[
        { opacity: pressed ? theme.opacity.pressed : 1 },
        underline ? { textDecorationLine: 'underline' } : null,
        style,
      ]}
      {...rest}
    />
  );
}
