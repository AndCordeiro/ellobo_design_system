import { Avatar, Row, Stack, Text, type AvatarSize } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export function AvatarsScreen() {
  return (
    <GalleryScreen title="Avatars" subtitle="Imagem, iniciais e fallback">
      <DemoSection title="Sizes">
        <Row gap="md" align="flex-end">
          {sizes.map((size) => (
            <Stack key={size} gap="xs" align="center">
              <Avatar size={size} name="André Cordeiro" />
              <Text variant="caption" color="tertiary">
                {size}
              </Text>
            </Stack>
          ))}
        </Row>
      </DemoSection>
      <DemoSection title="Fallbacks" description="Imagem → iniciais → ícone.">
        <Row gap="md" align="center">
          <Avatar
            size="lg"
            source={{ uri: 'https://i.pravatar.cc/160?img=12' }}
            name="Maria Silva"
          />
          <Avatar size="lg" name="Maria Silva" />
          <Avatar size="lg" fallback="EL" />
          <Avatar size="lg" />
          <Avatar size="lg" shape="rounded" name="Lobo" />
          <Avatar
            size="lg"
            source={{ uri: 'https://invalid.example/404.png' }}
            name="Falha Imagem"
          />
        </Row>
      </DemoSection>
    </GalleryScreen>
  );
}
