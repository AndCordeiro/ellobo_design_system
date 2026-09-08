import { useState } from 'react';
import { Alert, Button, Stack, Text } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function AlertScreen() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <GalleryScreen title="Alert" subtitle="Mensagens contextuais">
      <DemoSection title="Variants">
        <Stack gap="md">
          <Alert variant="info" title="Informação">
            Sua fatura fecha em 3 dias.
          </Alert>
          <Alert variant="success" title="Sucesso">
            Pagamento confirmado.
          </Alert>
          <Alert variant="warning" title="Atenção">
            Sua sessão expira em 5 minutos.
          </Alert>
          <Alert variant="error" title="Erro">
            Não foi possível salvar as alterações.
          </Alert>
        </Stack>
      </DemoSection>
      <DemoSection title="Sem título, com ação e dismiss">
        <Stack gap="md">
          <Alert variant="info">Mensagem simples sem título.</Alert>
          <Alert
            variant="warning"
            title="Verifique seu e-mail"
            action={{ label: 'Reenviar', onPress: () => undefined }}
          >
            Enviamos um link de confirmação.
          </Alert>
          {dismissed ? (
            <Button variant="secondary" onPress={() => setDismissed(false)}>
              Mostrar alerta novamente
            </Button>
          ) : (
            <Alert variant="success" title="Dispensável" onDismiss={() => setDismissed(true)}>
              Toque no X para fechar.
            </Alert>
          )}
          <Alert variant="error" icon="wifi-off" title="Sem conexão">
            <Text variant="bodySmall" color="error">
              Conteúdo customizado dentro do Alert.
            </Text>
          </Alert>
        </Stack>
      </DemoSection>
    </GalleryScreen>
  );
}
