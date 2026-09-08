import { createRef } from 'react';
import type { TextInput } from 'react-native';
import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { Input } from './Input';

describe('Input', () => {
  it('renders the label', () => {
    renderWithTheme(<Input label="E-mail" />);
    expect(screen.getByText('E-mail')).toBeOnTheScreen();
    expect(screen.getByLabelText('E-mail')).toBeOnTheScreen();
  });

  it('displays the controlled value', () => {
    renderWithTheme(<Input label="Nome" value="André" onChangeText={jest.fn()} />);
    expect(screen.getByLabelText('Nome')).toHaveDisplayValue('André');
  });

  it('calls onChangeText', () => {
    const onChangeText = jest.fn();
    renderWithTheme(<Input label="Nome" value="" onChangeText={onChangeText} />);

    fireEvent.changeText(screen.getByLabelText('Nome'), 'Maria');

    expect(onChangeText).toHaveBeenCalledWith('Maria');
  });

  it('shows the error message and hides the helper text', () => {
    renderWithTheme(
      <Input label="E-mail" helperText="Usaremos para contato" error="Informe um e-mail válido" />,
    );

    expect(screen.getByText('Informe um e-mail válido')).toBeOnTheScreen();
    expect(screen.queryByText('Usaremos para contato')).not.toBeOnTheScreen();
    expect(screen.getByRole('alert')).toBeOnTheScreen();
  });

  it('shows the helper text', () => {
    renderWithTheme(<Input label="Senha" helperText="Mínimo de 8 caracteres" />);
    expect(screen.getByText('Mínimo de 8 caracteres')).toBeOnTheScreen();
  });

  it('is not editable when disabled', () => {
    renderWithTheme(<Input label="CPF" disabled />);
    const input = screen.getByLabelText('CPF');
    expect(input.props.editable).toBe(false);
    expect(input).toBeDisabled();
  });

  it('marks required fields', () => {
    renderWithTheme(<Input label="Nome" required />);
    expect(screen.getByText('*', { exact: false })).toBeOnTheScreen();
  });

  it('forwards native props and refs', () => {
    const ref = createRef<TextInput>();
    renderWithTheme(
      <Input
        ref={ref}
        label="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="seu@email.com"
      />,
    );

    const input = screen.getByPlaceholderText('seu@email.com');
    expect(input.props.keyboardType).toBe('email-address');
    expect(input.props.autoCapitalize).toBe('none');
    expect(ref.current).not.toBeNull();
  });

  it('tracks focus state', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    renderWithTheme(<Input label="Nome" onFocus={onFocus} onBlur={onBlur} />);

    const input = screen.getByLabelText('Nome');
    fireEvent(input, 'focus');
    fireEvent(input, 'blur');

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
