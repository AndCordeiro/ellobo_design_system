import { useState } from 'react';
import { Button, IconButton, Row, Stack, type ButtonVariant } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger'];

export function ButtonsScreen() {
  const [loading, setLoading] = useState(false);

  const simulate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <GalleryScreen title="Buttons" subtitle="Button e IconButton">
      <DemoSection title="Variants">
        <Stack gap="sm">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} onPress={() => undefined}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </Stack>
      </DemoSection>
      <DemoSection title="Sizes">
        <Row gap="sm" align="center" wrap>
          <Button size="sm" onPress={() => undefined}>
            Small
          </Button>
          <Button size="md" onPress={() => undefined}>
            Medium
          </Button>
          <Button size="lg" onPress={() => undefined}>
            Large
          </Button>
        </Row>
      </DemoSection>
      <DemoSection title="With icons">
        <Row gap="sm" wrap>
          <Button leftIcon="plus" onPress={() => undefined}>
            Criar conta
          </Button>
          <Button rightIcon="arrow-right" variant="secondary" onPress={() => undefined}>
            Continuar
          </Button>
          <Button
            leftIcon="trash"
            rightIcon="arrow-right"
            variant="danger"
            onPress={() => undefined}
          >
            Excluir
          </Button>
        </Row>
      </DemoSection>
      <DemoSection
        title="States"
        description="Loading preserva as dimensões e bloqueia múltiplos toques."
      >
        <Stack gap="sm">
          <Button loading={loading} onPress={simulate} fullWidth>
            {loading ? 'Enviando' : 'Simular loading'}
          </Button>
          <Button variant="secondary" loading fullWidth>
            Loading secondary
          </Button>
          <Button variant="outline" loading fullWidth>
            Loading outline
          </Button>
          <Button disabled fullWidth>
            Disabled
          </Button>
          <Button variant="outline" disabled fullWidth>
            Disabled outline
          </Button>
        </Stack>
      </DemoSection>
      <DemoSection title="Full width">
        <Button fullWidth size="lg" rightIcon="arrow-right" onPress={() => undefined}>
          Entrar
        </Button>
      </DemoSection>
      <DemoSection title="IconButton">
        <Row gap="sm" align="center" wrap>
          {variants.map((variant) => (
            <IconButton
              key={variant}
              icon="settings"
              variant={variant}
              accessibilityLabel={`Configurações ${variant}`}
              onPress={() => undefined}
            />
          ))}
        </Row>
        <Row gap="sm" align="center" wrap>
          <IconButton
            icon="heart"
            size="sm"
            variant="secondary"
            accessibilityLabel="Favoritar"
            onPress={() => undefined}
          />
          <IconButton
            icon="heart"
            size="md"
            variant="secondary"
            accessibilityLabel="Favoritar"
            onPress={() => undefined}
          />
          <IconButton
            icon="heart"
            size="lg"
            variant="secondary"
            accessibilityLabel="Favoritar"
            onPress={() => undefined}
          />
          <IconButton
            icon="edit"
            shape="rounded"
            variant="outline"
            accessibilityLabel="Editar"
            onPress={() => undefined}
          />
          <IconButton icon="refresh" loading variant="primary" accessibilityLabel="Atualizando" />
          <IconButton icon="trash" disabled variant="danger" accessibilityLabel="Excluir" />
        </Row>
      </DemoSection>
    </GalleryScreen>
  );
}
