import { DesignSystemProvider, useThemeMode } from '@ellobo/design-system';
import { StatusBar } from 'expo-status-bar';
import { Navigator } from './navigation/Navigator';
import { screens } from './screens';
import { AppSettingsProvider, useAppSettings } from './state/AppSettings';
import { brands } from './themes';

function ThemedApp() {
  const { colorScheme, brand } = useAppSettings();
  const definition = brands[brand];

  return (
    <DesignSystemProvider
      lightTheme={definition.light}
      darkTheme={definition.dark}
      colorScheme={colorScheme}
    >
      <ThemedStatusBar />
      <Navigator screens={screens} />
    </DesignSystemProvider>
  );
}

function ThemedStatusBar() {
  const mode = useThemeMode();
  return <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />;
}

export function App() {
  return (
    <AppSettingsProvider>
      <ThemedApp />
    </AppSettingsProvider>
  );
}
