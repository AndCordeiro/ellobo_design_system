import { IconButton } from '../../components/IconButton/IconButton';
import type { IconButtonProps } from '../../components/IconButton/types';

export interface BackButtonProps extends Omit<IconButtonProps, 'icon' | 'accessibilityLabel'> {
  onPress: () => void;
  /** Defaults to "Voltar". */
  accessibilityLabel?: string;
  /** `arrow` (default) or `chevron`. */
  iconStyle?: 'arrow' | 'chevron';
}

/**
 * Back navigation button. The consumer provides the action.
 *
 * @example
 * <BackButton onPress={navigation.goBack} />
 */
export function BackButton({
  onPress,
  accessibilityLabel = 'Voltar',
  iconStyle = 'arrow',
  variant = 'ghost',
  ...rest
}: BackButtonProps) {
  return (
    <IconButton
      icon={iconStyle === 'chevron' ? 'chevron-left' : 'arrow-left'}
      accessibilityLabel={accessibilityLabel}
      variant={variant}
      onPress={onPress}
      {...rest}
    />
  );
}
