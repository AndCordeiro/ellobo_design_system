import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  it('hides the value by default and toggles visibility', () => {
    renderWithTheme(<PasswordInput label="Senha" value="segredo" onChangeText={jest.fn()} />);

    const input = screen.getByLabelText('Senha');
    expect(input.props.secureTextEntry).toBe(true);

    fireEvent.press(screen.getByRole('button', { name: 'Mostrar senha' }));
    expect(screen.getByLabelText('Senha').props.secureTextEntry).toBe(false);
    expect(screen.getByRole('button', { name: 'Ocultar senha' })).toBeOnTheScreen();
  });
});
