import {
  Badge,
  Icon,
  Row,
  StatusBadge,
  Tag,
  type BadgeVariant,
  type StatusBadgeVariant,
  type TagVariant,
} from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const badgeVariants: BadgeVariant[] = ['brand', 'neutral', 'success', 'warning', 'error', 'info'];
const tagVariants: TagVariant[] = ['neutral', 'brand', 'success', 'warning', 'error', 'info'];
const statusVariants: StatusBadgeVariant[] = ['neutral', 'info', 'success', 'warning', 'error'];

export function BadgesScreen() {
  return (
    <GalleryScreen title="Badges" subtitle="Badge, Tag e StatusBadge">
      <DemoSection title="Badge" description="Contadores e indicadores curtos.">
        <Row gap="sm" align="center" wrap>
          <Badge>3</Badge>
          <Badge variant="error">128</Badge>
          <Badge variant="neutral" size="sm">
            Novo
          </Badge>
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
          <Badge dot variant="error" />
        </Row>
      </DemoSection>
      <DemoSection title="Tag" description="Não interativa. Categoriza conteúdo com cores sutis.">
        <Row gap="sm" wrap>
          {tagVariants.map((variant) => (
            <Tag key={variant} variant={variant}>
              {variant}
            </Tag>
          ))}
          <Tag variant="success" leftIcon="check">
            Pago
          </Tag>
          <Tag size="sm" variant="brand">
            Pequena
          </Tag>
        </Row>
      </DemoSection>
      <DemoSection title="StatusBadge" description="Ponto colorido + rótulo de estado.">
        <Row gap="sm" wrap>
          {statusVariants.map((variant) => (
            <StatusBadge key={variant} variant={variant} label={variant} />
          ))}
          <StatusBadge variant="success" label="Sem ponto" hideDot />
        </Row>
      </DemoSection>
      <DemoSection title="Composição">
        <Row gap="sm" align="center">
          <Icon name="bell" size="lg" />
          <Badge variant="error" size="sm">
            9
          </Badge>
        </Row>
      </DemoSection>
    </GalleryScreen>
  );
}
