import { useState } from 'react';
import { Button, ConfirmDialog, Dialog, Input, Modal, Stack, Text } from '@ellobo/design-system';
import { DemoSection } from '../components/DemoSection';
import { GalleryScreen } from '../components/GalleryScreen';

export function OverlaysScreen() {
  const [modal, setModal] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [name, setName] = useState('');

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setConfirm(false);
    }, 1200);
  };

  return (
    <GalleryScreen title="Overlays" subtitle="Modal, Dialog e ConfirmDialog">
      <DemoSection title="Modal" description="Backdrop, botão de fechar, Android Back e teclado.">
        <Stack gap="sm">
          <Button onPress={() => setModal(true)}>Abrir modal centralizado</Button>
          <Button variant="secondary" onPress={() => setSheet(true)}>
            Abrir bottom sheet
          </Button>
        </Stack>
      </DemoSection>
      <DemoSection title="Dialog">
        <Button variant="outline" onPress={() => setDialog(true)}>
          Abrir dialog
        </Button>
      </DemoSection>
      <DemoSection title="ConfirmDialog">
        <Button variant="danger" leftIcon="trash" onPress={() => setConfirm(true)}>
          Excluir item
        </Button>
      </DemoSection>

      <Modal
        visible={modal}
        onClose={() => setModal(false)}
        title="Editar perfil"
        footer={
          <Button fullWidth onPress={() => setModal(false)}>
            Salvar
          </Button>
        }
      >
        <Stack gap="md">
          <Input label="Nome" value={name} onChangeText={setName} placeholder="Seu nome" />
          <Text color="secondary" variant="bodySmall">
            O teclado empurra o conteúdo no iOS; no Android o sistema redimensiona a janela.
          </Text>
        </Stack>
      </Modal>

      <Modal visible={sheet} onClose={() => setSheet(false)} title="Opções" position="bottom">
        <Stack gap="sm">
          <Button variant="secondary" fullWidth leftIcon="share" onPress={() => setSheet(false)}>
            Compartilhar
          </Button>
          <Button variant="secondary" fullWidth leftIcon="copy" onPress={() => setSheet(false)}>
            Copiar link
          </Button>
          <Button variant="ghost" fullWidth onPress={() => setSheet(false)}>
            Cancelar
          </Button>
        </Stack>
      </Modal>

      <Dialog
        visible={dialog}
        onClose={() => setDialog(false)}
        icon="info"
        title="Sessão expirada"
        description="Entre novamente para continuar de onde parou."
        actions={<Button onPress={() => setDialog(false)}>Entendi</Button>}
      />

      <ConfirmDialog
        visible={confirm}
        title="Excluir item?"
        description="Essa ação não poderá ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirm(false)}
      />
    </GalleryScreen>
  );
}
