import { useState } from 'react';
import { Chip, Row, Text } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const filters = ['Todos', 'Ativos', 'Pendentes', 'Arquivados'];

export function ChipsScreen() {
  const [selected, setSelected] = useState<string[]>(['Todos']);
  const [tags, setTags] = useState(['React Native', 'TypeScript', 'Design System']);

  const toggle = (filter: string) =>
    setSelected((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter],
    );

  return (
    <GalleryScreen title="Chips" subtitle="Seleção e filtros">
      <DemoSection title="Filtros selecionáveis">
        <Row gap="sm" wrap>
          {filters.map((filter) => (
            <Chip key={filter} selected={selected.includes(filter)} onPress={() => toggle(filter)}>
              {filter}
            </Chip>
          ))}
        </Row>
        <Text
          variant="bodySmall"
          color="secondary"
        >{`Selecionados: ${selected.join(', ') || 'nenhum'}`}</Text>
      </DemoSection>
      <DemoSection title="Removíveis">
        <Row gap="sm" wrap>
          {tags.map((tag) => (
            <Chip
              key={tag}
              leftIcon="star"
              onRemove={() => setTags((current) => current.filter((item) => item !== tag))}
            >
              {tag}
            </Chip>
          ))}
        </Row>
      </DemoSection>
      <DemoSection title="States">
        <Row gap="sm" wrap>
          <Chip>Default</Chip>
          <Chip selected>Selected</Chip>
          <Chip disabled>Disabled</Chip>
          <Chip selected disabled>
            Selected disabled
          </Chip>
        </Row>
      </DemoSection>
    </GalleryScreen>
  );
}
