import { useState } from 'react';
import { Card, Stack, Switch } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function SwitchScreen() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);

  return (
    <GalleryScreen title="Switch" subtitle="Alternância nativa com Theme">
      <DemoSection title="Com label" description="O label também alterna o valor.">
        <Card variant="outlined">
          <Stack gap="md">
            <Switch
              value={push}
              onValueChange={setPush}
              label="Notificações push"
              description="Alertas em tempo real"
            />
            <Switch
              value={email}
              onValueChange={setEmail}
              label="Resumo por e-mail"
              labelPosition="right"
            />
          </Stack>
        </Card>
      </DemoSection>
      <DemoSection title="States">
        <Switch value={false} onValueChange={() => undefined} label="Off" />
        <Switch value onValueChange={() => undefined} label="On" />
        <Switch value={false} disabled label="Disabled off" />
        <Switch value disabled label="Disabled on" />
        <Switch value onValueChange={() => undefined} />
      </DemoSection>
    </GalleryScreen>
  );
}
