import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles the value', () => {
    const onChange = jest.fn();
    renderWithTheme(<Checkbox checked={false} onChange={onChange} label="Aceito os termos" />);

    fireEvent.press(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('toggles when the label is pressed', () => {
    const onChange = jest.fn();
    renderWithTheme(<Checkbox checked onChange={onChange} label="Lembrar de mim" />);

    fireEvent.press(screen.getByText('Lembrar de mim'));

    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not toggle when disabled', () => {
    const onChange = jest.fn();
    renderWithTheme(<Checkbox checked={false} onChange={onChange} label="Opção" disabled />);

    fireEvent.press(screen.getByRole('checkbox'));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('exposes the accessibility state', () => {
    const { rerender } = renderWithTheme(<Checkbox checked label="Opção" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Opção' });
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeEnabled();

    rerender(<Checkbox checked={false} indeterminate label="Opção" />);
    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
  });
});
