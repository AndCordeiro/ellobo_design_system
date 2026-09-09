import type { TextStyle } from 'react-native';
import type { DesignSystemTheme } from '../../theme/types';
import { getTypographyStyle } from '../../utils/styles';

export function getSymbolStyle(theme: DesignSystemTheme, disabled: boolean): TextStyle {
  return {
    ...getTypographyStyle(theme, 'bodyLarge'),
    color: disabled ? theme.components.input.disabledTextColor : theme.colors.content.secondary,
  };
}
