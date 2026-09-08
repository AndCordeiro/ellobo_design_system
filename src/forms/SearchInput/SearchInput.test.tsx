import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('clears the value through the clear button', () => {
    const onChangeText = jest.fn();
    renderWithTheme(<SearchInput value="react" onChangeText={onChangeText} />);

    fireEvent.press(screen.getByRole('button', { name: 'Limpar busca' }));

    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('hides the clear button when empty and shows the spinner while loading', () => {
    const { rerender } = renderWithTheme(<SearchInput value="" onChangeText={jest.fn()} />);
    expect(screen.queryByTestId('search-clear-button')).not.toBeOnTheScreen();

    rerender(<SearchInput value="abc" onChangeText={jest.fn()} loading />);
    expect(screen.getByTestId('search-loading-indicator')).toBeOnTheScreen();
    expect(screen.queryByTestId('search-clear-button')).not.toBeOnTheScreen();
  });
});
