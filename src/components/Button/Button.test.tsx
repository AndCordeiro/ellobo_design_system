import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children', () => {
    renderWithTheme(<Button onPress={jest.fn()}>Continuar</Button>);
    expect(screen.getByText('Continuar')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeOnTheScreen();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    renderWithTheme(<Button onPress={onPress}>Salvar</Button>);

    fireEvent.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    renderWithTheme(
      <Button onPress={onPress} disabled>
        Salvar
      </Button>,
    );

    fireEvent.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
  });

  it('blocks interaction and shows a spinner while loading', () => {
    const onPress = jest.fn();
    renderWithTheme(
      <Button onPress={onPress} loading>
        Enviando
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Enviando' });
    fireEvent.press(button);

    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByTestId('button-loading-indicator')).toBeOnTheScreen();
    expect(button).toBeBusy();
    expect(button).toBeDisabled();
    // The label stays mounted (invisible) so the button keeps its dimensions.
    expect(screen.getByText('Enviando')).toBeOnTheScreen();
  });

  it('exposes the accessibility state', () => {
    renderWithTheme(<Button onPress={jest.fn()}>Ok</Button>);
    const button = screen.getByRole('button', { name: 'Ok' });
    expect(button).toBeEnabled();
    expect(button).not.toBeBusy();
  });

  it('supports every variant and size', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    renderWithTheme(
      <>
        {variants.map((variant) =>
          sizes.map((size) => (
            <Button
              key={`${variant}-${size}`}
              variant={variant}
              size={size}
              leftIcon="plus"
              rightIcon="arrow-right"
            >
              {`${variant} ${size}`}
            </Button>
          )),
        )}
      </>,
    );

    expect(screen.getAllByRole('button')).toHaveLength(variants.length * sizes.length);
  });

  it('forwards testID', () => {
    renderWithTheme(
      <Button onPress={jest.fn()} testID="submit-button">
        Ok
      </Button>,
    );
    expect(screen.getByTestId('submit-button')).toBeOnTheScreen();
  });
});
