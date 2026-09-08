import {
  Alert,
  Badge,
  Button,
  Card,
  Chip,
  Heading,
  Input,
  RadioGroup,
  Row,
  SegmentedControl,
  Stack,
  Tabs,
  Text,
  useDesignSystem,
  useTheme,
  type ColorSchemePreference,
} from '@ellobo/design-system';
import { useState } from 'react';
import { DemoSection } from '../components/DemoSection';
import { GalleryScreen } from '../components/GalleryScreen';
import { useAppSettings, type BrandId } from '../state/AppSettings';
import { brands } from '../themes';

export function ThemesScreen() {
  const theme = useTheme();
  const { colorScheme } = useDesignSystem();
  const settings = useAppSettings();
  const [tab, setTab] = useState<'overview' | 'history'>('overview');

  return (
    <GalleryScreen title="Themes" subtitle="Light, Dark, System e marcas">
      <DemoSection
        title="Aparência"
        description={`Preferência atual: ${colorScheme} · resolvido como ${theme.mode}`}
      >
        <SegmentedControl<ColorSchemePreference>
          options={[
            { label: 'Light', value: 'light', icon: 'sun' },
            { label: 'Dark', value: 'dark', icon: 'moon' },
            { label: 'System', value: 'system', icon: 'smartphone' },
          ]}
          value={settings.colorScheme}
          onChange={settings.setColorScheme}
        />
      </DemoSection>
      <DemoSection
        title="Marca"
        description="Nenhum componente muda: apenas o Theme criado com createTheme()."
      >
        <RadioGroup<BrandId>
          value={settings.brand}
          onChange={settings.setBrand}
          options={Object.values(brands).map((brand) => ({
            value: brand.id,
            label: brand.name,
            description: brand.description,
          }))}
        />
      </DemoSection>
      <DemoSection title="Preview" description="Os mesmos componentes com o tema ativo.">
        <Card variant="elevated">
          <Stack gap="md">
            <Row justify="space-between" align="center">
              <Heading size="sm">Resumo</Heading>
              <Badge>Novo</Badge>
            </Row>
            <Tabs
              items={[
                { key: 'overview', label: 'Visão geral' },
                { key: 'history', label: 'Histórico', badge: 3 },
              ]}
              value={tab}
              onChange={setTab}
            />
            <Input label="E-mail" placeholder="seu@email.com" />
            <Row gap="sm" wrap>
              <Chip selected>Selecionado</Chip>
              <Chip>Padrão</Chip>
            </Row>
            <Alert variant="info" title="Tokens semânticos">
              Backgrounds, bordas e conteúdo trocam junto com a marca.
            </Alert>
            <Row gap="sm">
              <Button style={{ flex: 1 }} onPress={() => undefined}>
                Primary
              </Button>
              <Button style={{ flex: 1 }} variant="outline" onPress={() => undefined}>
                Outline
              </Button>
            </Row>
          </Stack>
        </Card>
        <Text
          variant="caption"
          color="tertiary"
        >{`brand.primary ${theme.colors.brand.primary} · radius.md ${theme.radius.md}px`}</Text>
      </DemoSection>
    </GalleryScreen>
  );
}
