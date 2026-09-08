import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { SegmentedControl } from './SegmentedControl';

describe('SegmentedControl', () => {
  it('marks the selected segment and reports changes', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <SegmentedControl
        options={[
          { label: 'Todos', value: 'all' },
          { label: 'Ativos', value: 'active' },
        ]}
        value="all"
        onChange={onChange}
      />,
    );

    expect(screen.getByRole('tab', { name: 'Todos' })).toBeSelected();

    fireEvent.press(screen.getByRole('tab', { name: 'Ativos' }));

    expect(onChange).toHaveBeenCalledWith('active');
  });
});
