import { useCallback, useState } from 'react';
import { Animated } from 'react-native';
import {
  Alert,
  Box,
  Button,
  Row,
  Stack,
  Text,
  useReducedMotion,
  useTheme,
  type MotionDurationToken,
} from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';

const durations: MotionDurationToken[] = ['instant', 'fast', 'normal', 'slow'];

export function MotionScreen() {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const [translate] = useState(() => new Animated.Value(0));
  const [expanded, setExpanded] = useState(false);

  const animate = useCallback(
    (token: MotionDurationToken) => {
      const next = expanded ? 0 : 1;
      Animated.timing(translate, {
        toValue: next,
        duration: reducedMotion ? 0 : theme.motion.duration[token],
        useNativeDriver: true,
      }).start();
      setExpanded(!expanded);
    },
    [expanded, reducedMotion, theme.motion.duration, translate],
  );

  return (
    <GalleryScreen title="Motion" subtitle="Durações">
      {reducedMotion ? (
        <Alert variant="info" title="Reduce Motion ativo">
          As animações da biblioteca são desligadas automaticamente quando o sistema pede menos
          movimento.
        </Alert>
      ) : null}
      <DemoSection title="Durações" description="Toque para animar o bloco com cada duração.">
        <Stack gap="sm">
          {durations.map((token) => (
            <Row key={token} justify="space-between" align="center">
              <Text variant="labelLarge">{`${token} · ${theme.motion.duration[token]}ms`}</Text>
              <Button size="sm" variant="secondary" onPress={() => animate(token)}>
                Animar
              </Button>
            </Row>
          ))}
        </Stack>
      </DemoSection>
      <DemoSection title="Preview">
        <Box height={72} justify="center">
          <Animated.View
            style={{
              transform: [
                {
                  translateX: translate.interpolate({ inputRange: [0, 1], outputRange: [0, 200] }),
                },
              ],
            }}
          >
            <Box
              width={56}
              height={56}
              borderRadius="md"
              style={{ backgroundColor: theme.colors.action.primary }}
            />
          </Animated.View>
        </Box>
      </DemoSection>
    </GalleryScreen>
  );
}
