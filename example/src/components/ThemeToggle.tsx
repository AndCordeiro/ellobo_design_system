import { IconButton, useThemeMode } from '@ellobo/design-system';
import { useAppSettings } from '../state/AppSettings';

/**
 * Quick light/dark toggle used in every header of the gallery.
 */
export function ThemeToggle() {
  const mode = useThemeMode();
  const { setColorScheme } = useAppSettings();

  return (
    <IconButton
      icon={mode === 'dark' ? 'sun' : 'moon'}
      accessibilityLabel={mode === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'}
      onPress={() => setColorScheme(mode === 'dark' ? 'light' : 'dark')}
    />
  );
}
