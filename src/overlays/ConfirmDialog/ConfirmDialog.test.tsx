import { fireEvent, renderWithTheme, screen } from '../../test-utils/render';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  const baseProps = {
    title: 'Excluir item?',
    description: 'Essa ação não poderá ser desfeita.',
    confirmLabel: 'Excluir',
    cancelLabel: 'Cancelar',
  };

  it('renders title, description and actions when visible', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    renderWithTheme(
      <ConfirmDialog
        visible
        {...baseProps}
        destructive
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    expect(screen.getByText('Excluir item?')).toBeOnTheScreen();
    expect(screen.getByText('Essa ação não poderá ser desfeita.')).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button', { name: 'Excluir' }));
    fireEvent.press(screen.getByRole('button', { name: 'Cancelar' }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when hidden', () => {
    renderWithTheme(
      <ConfirmDialog visible={false} {...baseProps} onConfirm={jest.fn()} onCancel={jest.fn()} />,
    );
    expect(screen.queryByText('Excluir item?')).not.toBeOnTheScreen();
  });

  it('closes through the backdrop unless loading', () => {
    const onCancel = jest.fn();
    const { rerender } = renderWithTheme(
      <ConfirmDialog visible {...baseProps} onConfirm={jest.fn()} onCancel={onCancel} />,
    );

    fireEvent.press(screen.getByTestId('modal-backdrop'));
    expect(onCancel).toHaveBeenCalledTimes(1);

    rerender(
      <ConfirmDialog visible {...baseProps} loading onConfirm={jest.fn()} onCancel={onCancel} />,
    );
    fireEvent.press(screen.getByTestId('modal-backdrop'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
