import { useCallback, useState } from 'react';
import { IconButton } from '../../components/IconButton/IconButton';
import { Input } from '../Input/Input';
import type { InputProps } from '../Input/types';

export interface PasswordInputProps extends Omit<
  InputProps,
  'secureTextEntry' | 'rightIcon' | 'rightElement'
> {
  /** Accessibility label of the toggle while the password is hidden. */
  showPasswordLabel?: string;
  /** Accessibility label of the toggle while the password is visible. */
  hidePasswordLabel?: string;
  /** Initial visibility. Defaults to hidden. */
  defaultVisible?: boolean;
}

/**
 * Password field with a visibility toggle.
 *
 * @example
 * <PasswordInput label="Senha" value={password} onChangeText={setPassword} />
 */
export function PasswordInput({
  showPasswordLabel = 'Mostrar senha',
  hidePasswordLabel = 'Ocultar senha',
  defaultVisible = false,
  disabled,
  ...rest
}: PasswordInputProps) {
  const [visible, setVisible] = useState(defaultVisible);
  const toggle = useCallback(() => setVisible((current) => !current), []);

  return (
    <Input
      autoCapitalize="none"
      autoCorrect={false}
      textContentType="password"
      autoComplete="password"
      disabled={disabled}
      secureTextEntry={!visible}
      rightElement={
        <IconButton
          icon={visible ? 'eye-off' : 'eye'}
          size="sm"
          variant="ghost"
          disabled={disabled}
          accessibilityLabel={visible ? hidePasswordLabel : showPasswordLabel}
          onPress={toggle}
          testID="password-visibility-toggle"
        />
      }
      {...rest}
    />
  );
}
