import { useState } from 'react';
import { ColorSwatch, Row, Stack, Text, type ColorSwatchSize } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const palette = [
  { name: 'Vermelho', value: '#C8102E' },
  { name: 'Nude', value: '#E8C4A8' },
  { name: 'Rosa', value: '#F4A6C1' },
  { name: 'Vinho', value: '#5B0E2D' },
  { name: 'Azul', value: '#1E3A8A' },
  { name: 'Branco', value: '#FFFFFF' },
  { name: 'Preto', value: '#000000' },
];

const sizes: ColorSwatchSize[] = ['sm', 'md', 'lg'];

export function ColorSwatchesScreen() {
  const [selected, setSelected] = useState('Vermelho');

  return (
    <GalleryScreen title="Color Swatches" subtitle="Seleção de cor">
      <DemoSection title="Seleção única" description="Toque em uma cor para selecioná-la.">
        <Row gap="sm" wrap>
          {palette.map((color) => (
            <ColorSwatch
              key={color.name}
              color={color.value}
              accessibilityLabel={color.name}
              selected={selected === color.name}
              onPress={() => setSelected(color.name)}
            />
          ))}
        </Row>
        <Text variant="bodySmall" color="secondary">{`Selecionada: ${selected}`}</Text>
      </DemoSection>
      <DemoSection title="Sizes">
        <Row gap="md" align="flex-end">
          {sizes.map((size) => (
            <Stack key={size} gap="xs" align="center">
              <ColorSwatch size={size} color="#F4A6C1" accessibilityLabel={`Rosa ${size}`} />
              <Text variant="caption" color="tertiary">
                {size}
              </Text>
            </Stack>
          ))}
        </Row>
      </DemoSection>
      <DemoSection title="States">
        <Row gap="md" align="center" wrap>
          <ColorSwatch color="#C8102E" accessibilityLabel="Default" onPress={() => undefined} />
          <ColorSwatch
            color="#C8102E"
            accessibilityLabel="Selected"
            selected
            onPress={() => undefined}
          />
          <ColorSwatch
            color="#C8102E"
            accessibilityLabel="Disabled"
            disabled
            onPress={() => undefined}
          />
          <ColorSwatch color="#C8102E" accessibilityLabel="Display only" />
        </Row>
      </DemoSection>
    </GalleryScreen>
  );
}
