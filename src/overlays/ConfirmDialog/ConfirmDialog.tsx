import { Button } from '../../components/Button/Button';
import type { IconName } from '../../icons/Icon/icons';
import { Dialog, type DialogProps } from '../Dialog/Dialog';

export interface ConfirmDialogProps extends Pick<
  DialogProps,
  'visible' | 'title' | 'description' | 'children' | 'testID'
> {
  confirmLabel?: string;
  cancelLabel?: string;
  /** Uses the danger variant for the confirm button and an error-toned icon. */
  destructive?: boolean;
  /** Shows the confirm button in a loading state and blocks dismissal. */
  loading?: boolean;
  icon?: IconName;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Two-action confirmation dialog.
 *
 * @example
 * <ConfirmDialog
 *   visible={visible}
 *   title="Excluir item?"
 *   description="Essa ação não poderá ser desfeita."
 *   confirmLabel="Excluir"
 *   cancelLabel="Cancelar"
 *   destructive
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 * />
 */
export function ConfirmDialog({
  visible,
  title,
  description,
  children,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive = false,
  loading = false,
  icon,
  onConfirm,
  onCancel,
  testID,
}: ConfirmDialogProps) {
  return (
    <Dialog
      visible={visible}
      onClose={loading ? () => undefined : onCancel}
      dismissOnBackdropPress={!loading}
      title={title}
      description={description}
      icon={icon ?? (destructive ? 'warning' : undefined)}
      iconTone={destructive ? 'error' : 'brand'}
      testID={testID}
      actions={
        <>
          <Button
            variant="outline"
            onPress={onCancel}
            disabled={loading}
            style={{ flex: 1 }}
            testID="confirm-dialog-cancel"
          >
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? 'danger' : 'primary'}
            onPress={onConfirm}
            loading={loading}
            style={{ flex: 1 }}
            testID="confirm-dialog-confirm"
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      {children}
    </Dialog>
  );
}
