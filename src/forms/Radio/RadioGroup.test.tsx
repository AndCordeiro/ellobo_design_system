import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  const options = [
    { value: 'monthly', label: 'Mensal' },
    { value: 'yearly', label: 'Anual' },
  ] as const;

  it('selects an option and reports the typed value', () => {
    const onChange = jest.fn();
    renderWithTheme(<RadioGroup value="monthly" onChange={onChange} options={options} />);

    fireEvent.press(screen.getByRole('radio', { name: 'Anual' }));

    expect(onChange).toHaveBeenCalledWith('yearly');
    expect(screen.getByRole('radio', { name: 'Mensal' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Anual' })).not.toBeChecked();
  });

  it('disables every option when the group is disabled', () => {
    const onChange = jest.fn();
    renderWithTheme(<RadioGroup value={null} onChange={onChange} options={options} disabled />);

    fireEvent.press(screen.getByRole('radio', { name: 'Mensal' }));

    expect(onChange).not.toHaveBeenCalled();
  });
});
