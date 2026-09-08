import { useState } from 'react';
import {
  ActivityIndicator,
  Box,
  Button,
  LoadingOverlay,
  Row,
  Stack,
  Text,
} from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function LoadingScreen() {
  const [areaLoading, setAreaLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);

  const simulate = (setter: (value: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 1800);
  };

  return (
    <GalleryScreen
      title="Loading"
      subtitle="ActivityIndicator e LoadingOverlay"
      loading={screenLoading}
      loadingMessage="Carregando tela…"
    >
      <DemoSection title="ActivityIndicator">
        <Row gap="lg" align="center">
          <ActivityIndicator size="sm" />
          <ActivityIndicator size="md" />
          <ActivityIndicator size="lg" />
          <ActivityIndicator size="lg" color="secondary" />
          <ActivityIndicator size="lg" color="error" />
        </Row>
      </DemoSection>
      <DemoSection
        title="LoadingOverlay sobre uma área"
        description="Bloqueia toques apenas dentro do container."
      >
        <Box background="secondary" borderRadius="lg" padding="lg" minHeight={160} overflowHidden>
          <Stack gap="sm">
            <Text variant="titleMedium">Conteúdo da área</Text>
            <Text color="secondary">Este bloco fica coberto enquanto carrega.</Text>
            <Button variant="secondary" onPress={() => simulate(setAreaLoading)}>
              Carregar área
            </Button>
          </Stack>
          <LoadingOverlay visible={areaLoading} message="Sincronizando…" />
        </Box>
      </DemoSection>
      <DemoSection title="Screen loading" description="Prop loading do Screen/ScrollScreen.">
        <Button onPress={() => simulate(setScreenLoading)}>Carregar tela inteira</Button>
      </DemoSection>
    </GalleryScreen>
  );
}
