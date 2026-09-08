import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('is announced with its accessibility label', () => {
    const onPress = jest.fn();
    renderWithTheme(
      <IconButton icon="settings" accessibilityLabel="Configurações" onPress={onPress} />,
    );

    fireEvent.press(screen.getByRole('button', { name: 'Configurações' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire while disabled or loading', () => {
    const onPress = jest.fn();
    renderWithTheme(
      <>
        <IconButton icon="close" accessibilityLabel="Fechar" onPress={onPress} disabled />
        <IconButton icon="refresh" accessibilityLabel="Atualizar" onPress={onPress} loading />
      </>,
    );

    fireEvent.press(screen.getByRole('button', { name: 'Fechar' }));
    fireEvent.press(screen.getByRole('button', { name: 'Atualizar' }));

    expect(onPress).not.toHaveBeenCalled();
  });
});
