import { useState } from 'react';
import { Avatar, Badge, Card, Icon, ListItem, Switch, Tag } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

export function ListItemsScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <GalleryScreen title="List Items" subtitle="Linhas reutilizáveis" background="secondary">
      <DemoSection title="Menu" description="Interativo, com chevron automático.">
        <Card variant="outlined" padding="none">
          <ListItem
            title="Configurações"
            description="Gerencie sua conta"
            left={<Icon name="settings" />}
            onPress={() => undefined}
            divider
          />
          <ListItem
            title="Pagamentos"
            description="Cartões e histórico"
            left={<Icon name="credit-card" />}
            onPress={() => undefined}
            divider
          />
          <ListItem
            title="Sair"
            left={<Icon name="log-out" color="error" />}
            onPress={() => undefined}
            chevron={false}
          />
        </Card>
      </DemoSection>
      <DemoSection title="Com elementos à direita">
        <Card variant="outlined" padding="none">
          <ListItem
            title="Notificações"
            description="Alertas e novidades"
            left={<Icon name="bell" />}
            right={<Switch value={notifications} onValueChange={setNotifications} />}
            divider
          />
          <ListItem
            title="Mensagens"
            left={<Icon name="mail" />}
            right={<Badge variant="error">4</Badge>}
            onPress={() => undefined}
            divider
          />
          <ListItem
            title="Plano"
            left={<Icon name="zap" />}
            right={<Tag variant="brand">Pro</Tag>}
            onPress={() => undefined}
          />
        </Card>
      </DemoSection>
      <DemoSection title="Não interativo e desabilitado">
        <Card variant="outlined" padding="none">
          <ListItem
            title="Maria Silva"
            description="maria@ellobo.dev"
            left={<Avatar name="Maria Silva" size="sm" />}
            divider
          />
          <ListItem
            title="Item desabilitado"
            description="Indisponível no momento"
            left={<Icon name="lock" />}
            onPress={() => undefined}
            disabled
          />
        </Card>
      </DemoSection>
    </GalleryScreen>
  );
}
