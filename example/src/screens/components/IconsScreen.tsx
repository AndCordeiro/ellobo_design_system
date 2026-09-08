import { useState } from 'react';
import {
  Box,
  Icon,
  Row,
  SearchInput,
  Stack,
  Text,
  iconNames,
  type IconSize,
} from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export function IconsScreen() {
  const [query, setQuery] = useState('');
  const filtered = iconNames.filter((name) => name.includes(query.trim().toLowerCase()));

  return (
    <GalleryScreen title="Icons" subtitle={`${iconNames.length} ícones tipados`}>
      <DemoSection title="Sizes">
        <Row gap="lg" align="center">
          {sizes.map((size) => (
            <Stack key={size} gap="xs" align="center">
              <Icon name="star" size={size} color="brand" />
              <Text variant="caption" color="tertiary">
                {size}
              </Text>
            </Stack>
          ))}
        </Row>
      </DemoSection>
      <DemoSection title="Colors">
        <Row gap="md" align="center" wrap>
          <Icon name="heart" color="primary" />
          <Icon name="heart" color="secondary" />
          <Icon name="heart" color="tertiary" />
          <Icon name="heart" color="brand" />
          <Icon name="heart" color="success" />
          <Icon name="heart" color="warning" />
          <Icon name="heart" color="error" />
          <Icon name="heart" color="info" />
          <Icon name="heart" color="disabled" />
        </Row>
      </DemoSection>
      <DemoSection title="Catálogo">
        <SearchInput value={query} onChangeText={setQuery} placeholder="Buscar ícone" />
        <Row gap="sm" wrap>
          {filtered.map((name) => (
            <Box
              key={name}
              width={96}
              align="center"
              gap="xs"
              padding="sm"
              background="secondary"
              borderRadius="md"
            >
              <Icon name={name} size="lg" />
              <Text variant="caption" color="secondary" numberOfLines={1}>
                {name}
              </Text>
            </Box>
          ))}
        </Row>
      </DemoSection>
    </GalleryScreen>
  );
}
