import { useEffect, useState } from 'react';
import { Button, ProgressBar, Row, Stack } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function ProgressScreen() {
  const [value, setValue] = useState(0.35);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }
    const interval = setInterval(() => {
      setValue((current) => {
        if (current >= 1) {
          setRunning(false);
          return 1;
        }
        return Math.min(1, current + 0.1);
      });
    }, 400);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <GalleryScreen title="Progress" subtitle="Valor controlado">
      <DemoSection title="Interativo">
        <ProgressBar value={value} label="Enviando arquivo" showValue />
        <Row gap="sm">
          <Button size="sm" variant="secondary" onPress={() => setValue(0)}>
            Zerar
          </Button>
          <Button
            size="sm"
            onPress={() => {
              setValue(0);
              setRunning(true);
            }}
          >
            Simular
          </Button>
        </Row>
      </DemoSection>
      <DemoSection title="Tones e sizes">
        <Stack gap="md">
          <ProgressBar value={0.25} tone="brand" />
          <ProgressBar value={0.5} tone="success" />
          <ProgressBar value={0.65} tone="warning" />
          <ProgressBar value={0.9} tone="error" />
          <ProgressBar value={0.4} tone="info" size="sm" />
        </Stack>
      </DemoSection>
    </GalleryScreen>
  );
}
