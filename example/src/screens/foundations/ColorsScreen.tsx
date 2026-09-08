import { Stack, useTheme } from '@ellobo/design-system';
import { DemoSection } from '../../components/DemoSection';
import { GalleryScreen } from '../../components/GalleryScreen';
import { Swatch } from '../../components/Swatch';

export function ColorsScreen() {
  const theme = useTheme();
  const groups = [
    ['Brand', theme.colors.brand],
    ['Background', theme.colors.background],
    ['Content', theme.colors.content],
    ['Border', theme.colors.border],
    ['Action', theme.colors.action],
    ['Feedback', theme.colors.feedback],
  ] as const;

  return (
    <GalleryScreen title="Colors" subtitle={`Modo ${theme.mode}`}>
      {groups.map(([title, tokens]) => (
        <DemoSection key={title} title={title}>
          <Stack gap="sm">
            {Object.entries(tokens).map(([name, value]) => (
              <Swatch key={name} name={name} value={value} />
            ))}
          </Stack>
        </DemoSection>
      ))}
    </GalleryScreen>
  );
}
