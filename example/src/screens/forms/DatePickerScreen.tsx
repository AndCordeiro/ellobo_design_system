import { useState } from 'react';
import { Calendar, DatePicker, Stack, Text } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function DatePickerScreen() {
  const [date, setDate] = useState<string | null>(null);
  const [limited, setLimited] = useState<string | null>('2026-09-18');
  const [inline, setInline] = useState<string | null>('2026-09-18');

  return (
    <GalleryScreen title="Date Picker" subtitle="Datas em ISO, calendário em bottom sheet">
      <DemoSection title="Básico" description="Toque no campo para abrir o calendário.">
        <DatePicker label="Próxima cobrança" value={date} onChange={setDate} clearable />
        <Text color="secondary">Valor: {date ?? '—'}</Text>
      </DemoSection>
      <DemoSection title="Com limites e helper">
        <DatePicker
          label="Fim do período de teste"
          value={limited}
          onChange={setLimited}
          minDate="2026-09-01"
          maxDate="2026-12-31"
          helperText="Somente datas até o fim do ano"
        />
      </DemoSection>
      <DemoSection title="Estados">
        <Stack gap="sm">
          <DatePicker
            label="Com erro"
            value={null}
            onChange={() => undefined}
            error="Informe uma data"
          />
          <DatePicker label="Desabilitado" value="2026-09-18" onChange={() => undefined} disabled />
        </Stack>
      </DemoSection>
      <DemoSection title="Calendar inline" description="O mesmo calendário fora do sheet.">
        <Calendar value={inline} onChange={setInline} weekStartsOn={1} />
      </DemoSection>
    </GalleryScreen>
  );
}
