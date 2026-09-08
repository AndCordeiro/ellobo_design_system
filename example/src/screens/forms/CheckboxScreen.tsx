import { useState } from 'react';
import { Checkbox, Stack } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const options = ['Notificações por e-mail', 'Notificações push', 'Resumo semanal'];

export function CheckboxScreen() {
  const [terms, setTerms] = useState(false);
  const [selected, setSelected] = useState<string[]>(['Notificações push']);

  const all = selected.length === options.length;
  const some = selected.length > 0 && !all;

  return (
    <GalleryScreen title="Checkbox" subtitle="Seleção múltipla">
      <DemoSection title="Interativo" description="Toque no quadrado ou no label.">
        <Checkbox
          checked={terms}
          onChange={setTerms}
          label="Aceito os termos de uso"
          description="Você pode revogar a qualquer momento."
        />
      </DemoSection>
      <DemoSection title="Grupo com indeterminate">
        <Stack gap="sm">
          <Checkbox
            checked={all}
            indeterminate={some}
            onChange={(next) => setSelected(next ? [...options] : [])}
            label="Selecionar tudo"
          />
          {options.map((option) => (
            <Checkbox
              key={option}
              checked={selected.includes(option)}
              onChange={(next) =>
                setSelected((current) =>
                  next ? [...current, option] : current.filter((item) => item !== option),
                )
              }
              label={option}
              style={{ marginLeft: 32 }}
            />
          ))}
        </Stack>
      </DemoSection>
      <DemoSection title="States">
        <Stack gap="sm">
          <Checkbox checked={false} label="Unchecked" />
          <Checkbox checked label="Checked" />
          <Checkbox checked={false} indeterminate label="Indeterminate" />
          <Checkbox checked={false} error label="Error" />
          <Checkbox checked={false} disabled label="Disabled" />
          <Checkbox checked disabled label="Disabled checked" />
        </Stack>
      </DemoSection>
    </GalleryScreen>
  );
}
