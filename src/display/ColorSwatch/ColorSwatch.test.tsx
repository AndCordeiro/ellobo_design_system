import { StyleSheet } from 'react-native';
import { defaultDarkTheme } from '../../theme/dark';
import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { ColorSwatch } from './ColorSwatch';

describe('ColorSwatch', () => {
  it('is announced with its accessibility label', () => {
    renderWithTheme(
      <ColorSwatch color="#C8102E" accessibilityLabel="Vermelho" onPress={jest.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'Vermelho' })).toBeOnTheScreen();
  });

  it('exposes the selected state', () => {
    renderWithTheme(
      <>
        <ColorSwatch color="#C8102E" accessibilityLabel="Vermelho" selected onPress={jest.fn()} />
        <ColorSwatch color="#FFFFFF" accessibilityLabel="Branco" onPress={jest.fn()} />
      </>,
    );

    expect(screen.getByRole('button', { name: 'Vermelho' })).toBeSelected();
    expect(screen.getByRole('button', { name: 'Branco' })).not.toBeSelected();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    renderWithTheme(
      <ColorSwatch color="#C8102E" accessibilityLabel="Vermelho" onPress={onPress} />,
    );

    fireEvent.press(screen.getByRole('button', { name: 'Vermelho' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire while disabled', () => {
    const onPress = jest.fn();
    renderWithTheme(
      <ColorSwatch color="#C8102E" accessibilityLabel="Vermelho" disabled onPress={onPress} />,
    );

    const swatch = screen.getByRole('button', { name: 'Vermelho' });
    fireEvent.press(swatch);

    expect(swatch).toBeDisabled();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders as a non-interactive image without onPress', () => {
    renderWithTheme(<ColorSwatch color="#C8102E" accessibilityLabel="Vermelho" selected />);

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByRole('image', { name: 'Vermelho' })).toBeSelected();
  });

  it('keeps the touch target at least 44 points for the small size', () => {
    renderWithTheme(
      <ColorSwatch color="#C8102E" accessibilityLabel="Vermelho" size="sm" onPress={jest.fn()} />,
    );

    const swatch = screen.getByRole('button', { name: 'Vermelho' });
    const width = Number(StyleSheet.flatten(swatch.props.style).width);

    expect(width + 2 * Number(swatch.props.hitSlop)).toBeGreaterThanOrEqual(44);
  });

  it('draws the selection ring with the dark theme focus color', () => {
    renderWithTheme(
      <ColorSwatch
        color="#111111"
        accessibilityLabel="Preto"
        selected
        onPress={jest.fn()}
        testID="swatch"
      />,
      { theme: defaultDarkTheme },
    );

    expect(screen.getByRole('button', { name: 'Preto' })).toBeSelected();
    expect(screen.getByTestId('swatch')).toHaveStyle({
      borderColor: defaultDarkTheme.colors.border.focus,
    });
  });
});
