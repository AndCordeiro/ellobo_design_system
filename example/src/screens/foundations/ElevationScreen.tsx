import { Stack, Surface, Text, type ElevationLevel } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const levels: ElevationLevel[] = ['none', 'sm', 'md', 'lg'];

export function ElevationScreen() {
  return (
    <GalleryScreen title="Elevation" subtitle="Sombras centralizadas" background="secondary">
      <DemoSection
        title="Surface"
        description="Cada nível define sombra iOS e elevation Android a partir do theme."
      >
        <Stack gap="lg">
          {levels.map((level) => (
            <Surface key={level} elevation={level} padding="lg" bordered={level === 'none'}>
              <Text variant="titleMedium">{`elevation="${level}"`}</Text>
              <Text variant="bodySmall" color="secondary">
                Surface com background elevated e radius lg.
              </Text>
            </Surface>
          ))}
        </Stack>
      </DemoSection>
    </GalleryScreen>
  );
}
