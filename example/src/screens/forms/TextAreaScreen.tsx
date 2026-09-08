import { useState } from 'react';
import { TextArea } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function TextAreaScreen() {
  const [notes, setNotes] = useState('');
  const limit = 140;

  return (
    <GalleryScreen title="Text Area" subtitle="Campo multilinha">
      <DemoSection title="Interativo">
        <TextArea
          label="Observações"
          placeholder="Escreva algo…"
          value={notes}
          onChangeText={setNotes}
          maxLength={limit}
          helperText={`${notes.length}/${limit}`}
        />
      </DemoSection>
      <DemoSection title="States">
        <TextArea label="Rows = 2" rows={2} placeholder="Compacto" />
        <TextArea label="Disabled" value="Conteúdo bloqueado" disabled />
        <TextArea label="Error" value="Texto" error="Campo obrigatório" />
      </DemoSection>
    </GalleryScreen>
  );
}
