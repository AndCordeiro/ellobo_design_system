import { useState } from 'react';
import {
  Avatar,
  BackButton,
  Button,
  Card,
  Checkbox,
  Divider,
  Header,
  Heading,
  Icon,
  IconButton,
  Input,
  Link,
  ListItem,
  PasswordInput,
  Row,
  ScrollScreen,
  Stack,
  StatusBadge,
  Text,
} from '@ellobo/design-system';
import { useNavigation } from '../navigation/Navigator';
import { ThemeToggle } from '../components/ThemeToggle';

/**
 * A realistic sign-in screen built exclusively with library components.
 */
export function PlaygroundScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailError = submitted && !email.includes('@') ? 'Informe um e-mail válido' : undefined;
  const passwordError =
    submitted && password.length < 8 ? 'A senha deve ter pelo menos 8 caracteres' : undefined;

  const submit = () => {
    setSubmitted(true);
    if (!email.includes('@') || password.length < 8) {
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <ScrollScreen
      edges={['top', 'left', 'right']}
      header={
        <Header
          title="Entrar"
          left={<BackButton onPress={navigation.goBack} />}
          right={<ThemeToggle />}
        />
      }
    >
      <Stack gap="xl" paddingBottom="2xl">
        <Stack gap="xs">
          <Heading size="lg">Bem-vindo de volta</Heading>
          <Text color="secondary">Acesse sua conta para continuar.</Text>
        </Stack>

        <Stack gap="md">
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            leftIcon="mail"
            returnKeyType="next"
          />
          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            returnKeyType="done"
            onSubmitEditing={submit}
          />
          <Row justify="space-between" align="center">
            <Checkbox checked={remember} onChange={setRemember} label="Lembrar de mim" />
            <Link onPress={() => undefined}>Esqueci a senha</Link>
          </Row>
          <Button size="lg" fullWidth loading={loading} onPress={submit}>
            Entrar
          </Button>
        </Stack>

        <Row align="center" gap="md">
          <Divider style={{ flex: 1 }} />
          <Text variant="labelMedium" color="tertiary">
            ou
          </Text>
          <Divider style={{ flex: 1 }} />
        </Row>

        <Card variant="outlined">
          <Stack gap="md">
            <Row align="center" gap="md">
              <Avatar name="Maria Silva" size="lg" />
              <Stack gap="none" flex={1}>
                <Text variant="titleMedium">Maria Silva</Text>
                <Text variant="bodySmall" color="secondary">
                  maria@ellobo.dev
                </Text>
              </Stack>
              <StatusBadge variant="success" label="Online" />
            </Row>
            <Button variant="secondary" fullWidth leftIcon="user" onPress={() => undefined}>
              Continuar como Maria
            </Button>
          </Stack>
        </Card>

        <Card variant="outlined" padding="none">
          <ListItem
            title="Criar uma conta"
            description="Leva menos de um minuto"
            left={<Icon name="plus" color="brand" />}
            onPress={() => undefined}
            divider
          />
          <ListItem
            title="Ajuda"
            description="Fale com o suporte"
            left={<Icon name="help-circle" color="brand" />}
            right={
              <IconButton
                icon="external-link"
                accessibilityLabel="Abrir ajuda"
                size="sm"
                onPress={() => undefined}
              />
            }
          />
        </Card>
      </Stack>
    </ScrollScreen>
  );
}
