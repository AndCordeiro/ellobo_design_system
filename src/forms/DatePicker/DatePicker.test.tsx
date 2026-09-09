import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { Calendar } from './Calendar';
import { DatePicker } from './DatePicker';

describe('Calendar', () => {
  it('selects a day and announces dates for screen readers', () => {
    const onChange = jest.fn();
    renderWithTheme(<Calendar value="2026-09-10" onChange={onChange} testID="cal" />);

    expect(screen.getByText('Setembro de 2026')).toBeOnTheScreen();
    fireEvent.press(screen.getByLabelText('18 de setembro de 2026'));
    expect(onChange).toHaveBeenCalledWith('2026-09-18');
    expect(screen.getByLabelText('10 de setembro de 2026').props.accessibilityState.selected).toBe(
      true,
    );
  });

  it('disables days outside the range and navigates months', () => {
    renderWithTheme(
      <Calendar
        value="2026-09-10"
        onChange={jest.fn()}
        minDate="2026-09-05"
        maxDate="2026-10-31"
      />,
    );
    expect(screen.getByLabelText('4 de setembro de 2026').props.accessibilityState.disabled).toBe(
      true,
    );
    expect(screen.getByLabelText('Mês anterior')).toBeDisabled();

    fireEvent.press(screen.getByLabelText('Próximo mês'));
    expect(screen.getByText('Outubro de 2026')).toBeOnTheScreen();
    expect(screen.getByLabelText('Próximo mês')).toBeDisabled();
  });
});

describe('DatePicker', () => {
  it('shows the placeholder, then the formatted value after confirming a day', () => {
    const onChange = jest.fn();
    const { rerender } = renderWithTheme(
      <DatePicker label="Próxima cobrança" value={null} onChange={onChange} testID="date" />,
    );

    expect(screen.getByText('dd/mm/aaaa')).toBeOnTheScreen();
    fireEvent.press(screen.getByLabelText('Próxima cobrança'));
    fireEvent.press(screen.getByLabelText('Próximo mês'));
    const monthTitle = screen.getAllByRole('header').at(-1);
    expect(monthTitle).toBeDefined();

    const firstDay = screen
      .getAllByRole('button')
      .find((node) => /^1 de /.test(String(node.props.accessibilityLabel ?? '')));
    expect(firstDay).toBeDefined();
    fireEvent.press(firstDay!);
    fireEvent.press(screen.getByText('Confirmar'));

    expect(onChange).toHaveBeenCalledTimes(1);
    const iso = onChange.mock.calls[0]?.[0] as string;
    expect(iso).toMatch(/^\d{4}-\d{2}-01$/);

    rerender(
      <DatePicker label="Próxima cobrança" value="2026-09-18" onChange={onChange} testID="date" />,
    );
    expect(screen.getByText('18/09/2026')).toBeOnTheScreen();
  });

  it('clears the value when clearable', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <DatePicker label="Fim do teste" value="2026-09-18" onChange={onChange} clearable />,
    );
    fireEvent.press(screen.getByLabelText('Limpar'));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('shows error and helper text through FormField', () => {
    renderWithTheme(
      <DatePicker
        label="Data"
        value={null}
        onChange={jest.fn()}
        helperText="Opcional"
        error="Informe uma data"
      />,
    );
    expect(screen.getByText('Informe uma data')).toBeOnTheScreen();
    expect(screen.getByLabelText('Data').props.accessibilityState.disabled).toBe(false);
  });
});
