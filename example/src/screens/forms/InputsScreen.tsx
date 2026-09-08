import { useState } from 'react';
import { FormField, FormHelperText, FormLabel, Input, Stack } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function InputsScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('André Cordeiro');
  const emailError =
    email.length > 0 && !email.includes('@') ? 'Informe um e-mail válido' : undefined;

  return (
    <GalleryScreen title="Inputs" subtitle="Estados do Input">
      <DemoSection title="Interativo" description="Digite para ver focused, filled e error.">
        <Input
          label="E-mail"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          error={emailError}
          helperText="Usaremos apenas para contato"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          leftIcon="mail"
          required
        />
      </DemoSection>
      <DemoSection title="States">
        <Stack gap="md">
          <Input label="Default" placeholder="Placeholder" />
          <Input label="Filled" value={name} onChangeText={setName} />
          <Input label="Disabled" value="Não editável" disabled />
          <Input label="Error" value="valor inválido" error="Mensagem de erro" />
          <Input label="Success" value="valor válido" success />
          <Input label="Helper" placeholder="Com texto de apoio" helperText="Texto de apoio" />
          <Input label="Left icon" placeholder="Buscar cidade" leftIcon="map-pin" />
          <Input label="Right icon" placeholder="Data" rightIcon="calendar" />
        </Stack>
      </DemoSection>
      <DemoSection title="Sizes">
        <Stack gap="md">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </Stack>
      </DemoSection>
      <DemoSection
        title="FormField"
        description="Composição manual de label, controle e mensagens."
      >
        <FormField label="CPF" helperText="Somente números" required>
          <Input placeholder="000.000.000-00" keyboardType="number-pad" />
        </FormField>
        <Stack gap="xs">
          <FormLabel>Label isolada</FormLabel>
          <FormHelperText>FormHelperText isolado</FormHelperText>
        </Stack>
      </DemoSection>
    </GalleryScreen>
  );
}
