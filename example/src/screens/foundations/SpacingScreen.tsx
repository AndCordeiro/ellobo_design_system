import { Box, Row, Stack, Text, useTheme, type SpacingToken } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const aliases: SpacingToken[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const scale = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const;

export function SpacingScreen() {
  const theme = useTheme();

  return (
    <GalleryScreen title="Spacing" subtitle="Grade de 4pt">
      <DemoSection
        title="Aliases semânticos"
        description="Vocabulário público usado por padding, gap e margin."
      >
        <Stack gap="sm">
          {aliases.map((alias) => (
            <Row key={alias} gap="md" align="center">
              <Box width={48}>
                <Text variant="labelLarge">{alias}</Text>
              </Box>
              <Box
                height={16}
                width={Math.max(theme.spacing[alias], 2)}
                borderRadius="xs"
                style={{ backgroundColor: theme.colors.action.primary }}
              />
              <Text variant="caption" color="tertiary">{`${theme.spacing[alias]}px`}</Text>
            </Row>
          ))}
        </Stack>
      </DemoSection>
      <DemoSection
        title="Escala primitiva"
        description="Disponível em theme.spacing[n] para uso interno e ajustes finos."
      >
        <Stack gap="sm">
          {scale.map((step) => (
            <Row key={step} gap="md" align="center">
              <Box width={48}>
                <Text variant="labelLarge">{String(step)}</Text>
              </Box>
              <Box
                height={12}
                width={Math.max(theme.spacing[step], 2)}
                borderRadius="xs"
                style={{ backgroundColor: theme.colors.brand.secondary }}
              />
              <Text variant="caption" color="tertiary">{`${theme.spacing[step]}px`}</Text>
            </Row>
          ))}
        </Stack>
      </DemoSection>
    </GalleryScreen>
  );
}
