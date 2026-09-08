import {
  Box,
  Card,
  Divider,
  Heading,
  Icon,
  ListItem,
  Row,
  ScrollScreen,
  Stack,
  Tag,
  Text,
  designSystemVersion,
  useThemeMode,
  type IconName,
} from '@ellobo/design-system';
import { useNavigation, type RouteName } from '../navigation/Navigator';
import { useAppSettings } from '../state/AppSettings';
import { brands } from '../themes';
import { ThemeToggle } from '../components/ThemeToggle';

interface Entry {
  title: string;
  description: string;
  icon: IconName;
  route: RouteName;
}

interface Section {
  title: string;
  entries: Entry[];
}

const sections: Section[] = [
  {
    title: 'Foundations',
    entries: [
      { title: 'Colors', description: 'Tokens semânticos de cor', icon: 'layers', route: 'Colors' },
      { title: 'Typography', description: 'Escala tipográfica', icon: 'edit', route: 'Typography' },
      { title: 'Spacing', description: 'Grade de 4pt e aliases', icon: 'grid', route: 'Spacing' },
      {
        title: 'Radius',
        description: 'Arredondamento de cantos',
        icon: 'smartphone',
        route: 'Radius',
      },
      {
        title: 'Elevation',
        description: 'Sombras iOS e Android',
        icon: 'copy',
        route: 'Elevation',
      },
      { title: 'Motion', description: 'Durações e Reduce Motion', icon: 'zap', route: 'Motion' },
    ],
  },
  {
    title: 'Components',
    entries: [
      { title: 'Buttons', description: 'Button e IconButton', icon: 'check', route: 'Buttons' },
      { title: 'Icons', description: 'Conjunto de ícones tipado', icon: 'star', route: 'Icons' },
      { title: 'Cards', description: 'Card e PressableCard', icon: 'credit-card', route: 'Cards' },
      {
        title: 'Avatars',
        description: 'Imagem, iniciais e fallback',
        icon: 'user',
        route: 'Avatars',
      },
      { title: 'Badges', description: 'Badge, Tag e StatusBadge', icon: 'bell', route: 'Badges' },
      { title: 'Chips', description: 'Seleção e filtros', icon: 'filter', route: 'Chips' },
      {
        title: 'List Items',
        description: 'Linhas de lista e menus',
        icon: 'list',
        route: 'ListItems',
      },
    ],
  },
  {
    title: 'Forms',
    entries: [
      { title: 'Inputs', description: 'Estados do Input', icon: 'edit', route: 'Inputs' },
      {
        title: 'Password Input',
        description: 'Alternância de visibilidade',
        icon: 'lock',
        route: 'PasswordInput',
      },
      {
        title: 'Search Input',
        description: 'Busca com limpar e loading',
        icon: 'search',
        route: 'SearchInput',
      },
      { title: 'Text Area', description: 'Campo multilinha', icon: 'menu', route: 'TextArea' },
      { title: 'Checkbox', description: 'Seleção múltipla', icon: 'check', route: 'Checkbox' },
      { title: 'Radio', description: 'Seleção única', icon: 'more', route: 'Radio' },
      { title: 'Switch', description: 'Alternância nativa', icon: 'settings', route: 'Switch' },
    ],
  },
  {
    title: 'Feedback',
    entries: [
      {
        title: 'Loading',
        description: 'ActivityIndicator e overlay',
        icon: 'refresh',
        route: 'Loading',
      },
      {
        title: 'Progress',
        description: 'Barra de progresso',
        icon: 'arrow-right',
        route: 'Progress',
      },
      { title: 'Skeleton', description: 'Placeholders animados', icon: 'image', route: 'Skeleton' },
      { title: 'Alert', description: 'Mensagens contextuais', icon: 'warning', route: 'Alert' },
      {
        title: 'Empty / Error / Success',
        description: 'Estados de tela',
        icon: 'inbox',
        route: 'States',
      },
    ],
  },
  {
    title: 'Overlays',
    entries: [
      {
        title: 'Modal, Dialog e Confirm',
        description: 'Demonstrações interativas',
        icon: 'external-link',
        route: 'Overlays',
      },
    ],
  },
  {
    title: 'Themes',
    entries: [
      {
        title: 'Theme & Brand',
        description: 'Light, Dark, System e marcas',
        icon: 'sun',
        route: 'Themes',
      },
      {
        title: 'Playground',
        description: 'Tela real montada com a biblioteca',
        icon: 'smartphone',
        route: 'Playground',
      },
    ],
  },
];

export function HomeScreen() {
  const navigation = useNavigation();
  const mode = useThemeMode();
  const { brand } = useAppSettings();

  return (
    <ScrollScreen padding="none" edges={['top', 'left', 'right']}>
      <Box paddingHorizontal="md" paddingTop="md" paddingBottom="lg">
        <Row justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Text variant="labelMedium" color="brand" style={{ letterSpacing: 2 }}>
              EL LOBO
            </Text>
            <Heading size="xl">Design System</Heading>
            <Row gap="sm" align="center">
              <Tag variant="brand">{`v${designSystemVersion}`}</Tag>
              <Tag>{mode === 'dark' ? 'Dark' : 'Light'}</Tag>
              <Tag>{brands[brand].name}</Tag>
            </Row>
          </Stack>
          <ThemeToggle />
        </Row>
      </Box>

      <Stack gap="lg" paddingHorizontal="md" paddingBottom="2xl">
        {sections.map((section) => (
          <Stack key={section.title} gap="sm">
            <Text
              variant="labelMedium"
              color="tertiary"
              style={{ textTransform: 'uppercase', letterSpacing: 1 }}
            >
              {section.title}
            </Text>
            <Card variant="outlined" padding="none">
              {section.entries.map((entry, index) => (
                <ListItem
                  key={entry.route}
                  title={entry.title}
                  description={entry.description}
                  left={<Icon name={entry.icon} color="brand" />}
                  divider={index < section.entries.length - 1}
                  onPress={() =>
                    entry.route === 'States'
                      ? navigation.navigate('States', { initial: 'empty' })
                      : navigation.navigate(entry.route as Exclude<RouteName, 'States'>)
                  }
                />
              ))}
            </Card>
          </Stack>
        ))}
        <Divider />
        <Text variant="caption" color="tertiary" align="center">
          Todos os componentes desta galeria vêm de @ellobo/design-system.
        </Text>
      </Stack>
    </ScrollScreen>
  );
}
