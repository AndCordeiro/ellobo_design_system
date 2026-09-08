import { useCallback } from 'react';
import { IconButton } from '../../components/IconButton/IconButton';
import { ActivityIndicator } from '../../feedback/ActivityIndicator/ActivityIndicator';
import { Input } from '../Input/Input';
import type { InputProps } from '../Input/types';

export interface SearchInputProps extends Omit<
  InputProps,
  'leftIcon' | 'rightIcon' | 'rightElement'
> {
  /** Shows a spinner instead of the clear button. */
  loading?: boolean;
  /** Called when the clear button is pressed. Defaults to `onChangeText('')`. */
  onClear?: () => void;
  /** Accessibility label of the clear button. */
  clearLabel?: string;
}

/**
 * Search field with a leading search icon, a clear button and an optional loading indicator.
 *
 * @example
 * <SearchInput value={query} onChangeText={setQuery} placeholder="Buscar" loading={isFetching} />
 */
export function SearchInput({
  value,
  onChangeText,
  loading = false,
  onClear,
  clearLabel = 'Limpar busca',
  disabled,
  placeholder = 'Buscar',
  ...rest
}: SearchInputProps) {
  const handleClear = useCallback(() => {
    if (onClear) {
      onClear();
    } else {
      onChangeText?.('');
    }
  }, [onClear, onChangeText]);

  const hasValue = typeof value === 'string' && value.length > 0;

  const rightElement = loading ? (
    <ActivityIndicator size="sm" color="tertiary" testID="search-loading-indicator" />
  ) : hasValue ? (
    <IconButton
      icon="close"
      size="sm"
      variant="ghost"
      disabled={disabled}
      accessibilityLabel={clearLabel}
      onPress={handleClear}
      testID="search-clear-button"
    />
  ) : null;

  return (
    <Input
      leftIcon="search"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      returnKeyType="search"
      autoCapitalize="none"
      autoCorrect={false}
      disabled={disabled}
      rightElement={rightElement}
      accessibilityRole="search"
      {...rest}
    />
  );
}
