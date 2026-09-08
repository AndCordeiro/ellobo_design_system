import { Box, Row, Stack, Text, useTheme, type RadiusToken } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const tokens: RadiusToken[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];

export function RadiusScreen() {
  const theme = useTheme();

  return (
    <GalleryScreen title="Radius" subtitle="Arredondamento por token">
      <DemoSection
        title="Tokens"
        description="Troque de marca na tela Themes para ver o radius mudar em toda a biblioteca."
      >
        <Row gap="md" wrap>
          {tokens.map((token) => (
            <Stack key={token} gap="xs" align="center">
              <Box
                width={72}
                height={72}
                borderRadius={token}
                background="brandSubtle"
                borderColor="focus"
              />
              <Text variant="labelMedium">{token}</Text>
              <Text variant="caption" color="tertiary">{`${theme.radius[token]}px`}</Text>
            </Stack>
          ))}
        </Row>
      </DemoSection>
    </GalleryScreen>
  );
}
