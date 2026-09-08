import { useCallback, useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Icon } from '../../icons/Icon/Icon';
import { useTheme } from '../../theme/useTheme';
import { FormField } from '../FormField/FormField';
import { getInputStyles } from './styles';
import type { InputProps } from './types';

/**
 * Text field with label, helper text, error, icons and all interaction states.
 *
 * @example
 * <Input
 *   label="E-mail"
 *   placeholder="seu@email.com"
 *   keyboardType="email-address"
 *   autoCapitalize="none"
 *   value={email}
 *   onChangeText={setEmail}
 *   error={emailError}
 * />
 */
export function Input({
  label,
  required,
  helperText,
  error,
  success = false,
  disabled = false,
  size = 'md',
  leftIcon,
  rightIcon,
  leftElement,
  rightElement,
  style,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  multiline = false,
  accessibilityLabel,
  accessibilityState,
  placeholderTextColor,
  ref,
  ...rest
}: InputProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const resolved = useMemo(
    () =>
      getInputStyles(theme, {
        size,
        focused,
        disabled,
        error: Boolean(error),
        success,
        multiline,
      }),
    [theme, size, focused, disabled, error, success, multiline],
  );

  const handleFocus = useCallback<NonNullable<InputProps['onFocus']>>(
    (event) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback<NonNullable<InputProps['onBlur']>>(
    (event) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const left =
    leftElement ??
    (leftIcon ? <Icon name={leftIcon} size="md" color={resolved.iconColor} /> : null);
  const right =
    rightElement ??
    (rightIcon ? <Icon name={rightIcon} size="md" color={resolved.iconColor} /> : null);

  return (
    <FormField
      label={label}
      required={required}
      disabled={disabled}
      helperText={helperText}
      error={error}
      style={style}
    >
      <View style={[resolved.container, containerStyle]}>
        {left}
        <TextInput
          ref={ref}
          editable={!disabled}
          multiline={multiline}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={placeholderTextColor ?? resolved.placeholderColor}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{ disabled, ...accessibilityState }}
          accessibilityHint={error}
          style={[resolved.input, inputStyle]}
          {...rest}
        />
        {right}
      </View>
    </FormField>
  );
}
