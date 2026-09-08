import {
  Divider,
  Heading,
  Link,
  Stack,
  Text,
  useTheme,
  type TypographyVariantName,
} from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function TypographyScreen() {
  const theme = useTheme();
  const variants = Object.keys(theme.typography.variants) as TypographyVariantName[];

  return (
    <GalleryScreen title="Typography" subtitle="Variants e componentes">
      <DemoSection
        title="Variants"
        description="Cada variant define tamanho, altura de linha, peso e espaçamento."
      >
        <Stack gap="md">
          {variants.map((variant) => {
            const definition = theme.typography.variants[variant];
            return (
              <Stack key={variant} gap="none">
                <Text variant={variant}>O rápido lobo cinza</Text>
                <Text variant="caption" color="tertiary">
                  {`${variant} · ${definition.fontSize}/${definition.lineHeight} · ${definition.weight}`}
                </Text>
              </Stack>
            );
          })}
        </Stack>
      </DemoSection>
      <Divider />
      <DemoSection
        title="Heading"
        description="Semântico: anunciado como cabeçalho por leitores de tela."
      >
        <Heading size="2xl">Display</Heading>
        <Heading size="xl">Heading xl</Heading>
        <Heading size="lg">Heading lg</Heading>
        <Heading size="md">Heading md</Heading>
        <Heading size="sm">Heading sm</Heading>
      </DemoSection>
      <DemoSection title="Text colors">
        <Text color="primary">Primary</Text>
        <Text color="secondary">Secondary</Text>
        <Text color="tertiary">Tertiary</Text>
        <Text color="disabled">Disabled</Text>
        <Text color="brand">Brand</Text>
        <Text color="success">Success</Text>
        <Text color="warning">Warning</Text>
        <Text color="error">Error</Text>
      </DemoSection>
      <DemoSection title="Link">
        <Link onPress={() => undefined}>Termos de uso</Link>
        <Link onPress={() => undefined} underline>
          Política de privacidade
        </Link>
        <Link disabled>Link desabilitado</Link>
      </DemoSection>
    </GalleryScreen>
  );
}
