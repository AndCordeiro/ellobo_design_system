import { View } from 'react-native';
import { Icon } from '../../icons/Icon/Icon';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../../typography/Text/Text';
import type { TextProps } from '../../typography/Text/types';

export interface FormErrorProps extends Omit<TextProps, 'variant' | 'color'> {
  /** Hides the leading error icon. */
  hideIcon?: boolean;
}

/**
 * Validation message displayed under a form control. Announced to screen readers as an alert.
 */
export function FormError({ hideIcon = false, children, style, ...rest }: FormErrorProps) {
  const theme = useTheme();

  if (!children) {
    return null;
  }

  return (
    <View
      accessible
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={{ flexDirection: 'row', alignItems: 'flex-start', gap: theme.spacing.xs }}
    >
      {hideIcon ? null : (
        <View style={{ paddingTop: 2 }}>
          <Icon name="error" size="xs" color="error" />
        </View>
      )}
      <Text variant="bodySmall" color="error" style={[{ flexShrink: 1 }, style]} {...rest}>
        {children}
      </Text>
    </View>
  );
}
