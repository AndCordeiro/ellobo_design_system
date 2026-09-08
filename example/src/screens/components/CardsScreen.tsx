import {
  Card,
  Heading,
  Icon,
  PressableCard,
  Row,
  Stack,
  StatusBadge,
  Text,
} from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function CardsScreen() {
  return (
    <GalleryScreen title="Cards" subtitle="Card e PressableCard" background="secondary">
      <DemoSection
        title="Variants"
        description="Composição livre: coloque Stack, Text e Row dentro do Card."
      >
        <Card variant="elevated">
          <Stack gap="xs">
            <Heading size="sm">Elevated</Heading>
            <Text color="secondary">Background elevated com sombra sm.</Text>
          </Stack>
        </Card>
        <Card variant="outlined">
          <Stack gap="xs">
            <Heading size="sm">Outlined</Heading>
            <Text color="secondary">Borda 1px com border.primary.</Text>
          </Stack>
        </Card>
        <Card variant="filled">
          <Stack gap="xs">
            <Heading size="sm">Filled</Heading>
            <Text color="secondary">Background secondary, sem sombra.</Text>
          </Stack>
        </Card>
      </DemoSection>
      <DemoSection
        title="PressableCard"
        description="Feedback visual ao pressionar e semântica de botão."
      >
        <PressableCard onPress={() => undefined} accessibilityLabel="Abrir plano Pro">
          <Row align="center" gap="md">
            <Icon name="zap" color="brand" size="lg" />
            <Stack gap="none" flex={1}>
              <Text variant="titleMedium">Plano Pro</Text>
              <Text variant="bodySmall" color="secondary">
                R$ 49/mês · cancele quando quiser
              </Text>
            </Stack>
            <StatusBadge variant="success" label="Ativo" />
          </Row>
        </PressableCard>
        <PressableCard variant="outlined" disabled>
          <Text>PressableCard disabled</Text>
        </PressableCard>
      </DemoSection>
    </GalleryScreen>
  );
}
