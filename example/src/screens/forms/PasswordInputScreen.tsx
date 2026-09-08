import { useState } from 'react';
import { PasswordInput, Stack } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function PasswordInputScreen() {
  const [password, setPassword] = useState('');
  const weak =
    password.length > 0 && password.length < 8 ? 'Use pelo menos 8 caracteres' : undefined;

  return (
    <GalleryScreen title="Password Input" subtitle="Alternância de visibilidade">
      <DemoSection title="Interativo">
        <PasswordInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          error={weak}
          helperText="Mínimo de 8 caracteres"
          required
        />
      </DemoSection>
      <DemoSection title="States">
        <Stack gap="md">
          <PasswordInput label="Visível por padrão" value="segredo" defaultVisible />
          <PasswordInput label="Disabled" value="segredo" disabled />
          <PasswordInput label="Error" value="123" error="Senha muito curta" />
        </Stack>
      </DemoSection>
    </GalleryScreen>
  );
}
