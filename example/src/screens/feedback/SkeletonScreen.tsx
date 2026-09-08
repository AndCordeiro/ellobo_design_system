import { Card, Row, Skeleton, Stack } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function SkeletonScreen() {
  return (
    <GalleryScreen title="Skeleton" subtitle="Placeholders animados">
      <DemoSection title="Primitivos">
        <Skeleton width="100%" height={20} />
        <Skeleton width="60%" height={16} />
        <Skeleton width={120} height={36} radius="full" />
        <Skeleton circle height={48} />
        <Skeleton width="100%" height={120} radius="lg" animated={false} />
      </DemoSection>
      <DemoSection title="Composição: card de perfil">
        <Card variant="outlined">
          <Row gap="md" align="center">
            <Skeleton circle height={56} />
            <Stack gap="sm" flex={1}>
              <Skeleton width="50%" height={16} />
              <Skeleton width="80%" height={12} />
            </Stack>
          </Row>
        </Card>
      </DemoSection>
      <DemoSection title="Composição: lista">
        <Stack gap="md">
          {[0, 1, 2].map((item) => (
            <Row key={item} gap="md" align="center">
              <Skeleton width={40} height={40} radius="md" />
              <Stack gap="xs" flex={1}>
                <Skeleton width="70%" height={14} />
                <Skeleton width="40%" height={12} />
              </Stack>
            </Row>
          ))}
        </Stack>
      </DemoSection>
    </GalleryScreen>
  );
}
