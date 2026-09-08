import { createContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { defaultDarkTheme } from './dark';
import { defaultLightTheme } from './light';
import type { DesignSystemTheme, ThemeMode } from './types';

export type ColorSchemePreference = ThemeMode | 'system';

export interface DesignSystemContextValue {
  theme: DesignSystemTheme;
  /** Resolved mode of the active theme. */
  mode: ThemeMode;
  /** Preference passed to the provider (`system` resolves to the OS appearance). */
  colorScheme: ColorSchemePreference;
}

export const DesignSystemContext = createContext<DesignSystemContextValue | null>(null);

export interface DesignSystemProviderProps {
  /**
   * Explicit theme. When provided, `lightTheme`, `darkTheme` and `colorScheme` are ignored.
   */
  theme?: DesignSystemTheme;
  /** Theme used when the resolved color scheme is `light`. Defaults to `defaultLightTheme`. */
  lightTheme?: DesignSystemTheme;
  /** Theme used when the resolved color scheme is `dark`. Defaults to `defaultDarkTheme`. */
  darkTheme?: DesignSystemTheme;
  /** `light`, `dark` or `system` (follows the OS appearance). Defaults to `system`. */
  colorScheme?: ColorSchemePreference;
  /**
   * Wraps children with `SafeAreaProvider` from `react-native-safe-area-context`.
   * Set to `false` if your app already renders one above this provider.
   */
  safeAreaProvider?: boolean;
  children: ReactNode;
}

export function DesignSystemProvider({
  theme,
  lightTheme = defaultLightTheme,
  darkTheme = defaultDarkTheme,
  colorScheme = 'system',
  safeAreaProvider = true,
  children,
}: DesignSystemProviderProps) {
  const systemScheme = useColorScheme();

  const resolvedTheme = useMemo(() => {
    if (theme) {
      return theme;
    }
    const resolved = colorScheme === 'system' ? (systemScheme ?? 'light') : colorScheme;
    return resolved === 'dark' ? darkTheme : lightTheme;
  }, [theme, colorScheme, systemScheme, lightTheme, darkTheme]);

  const value = useMemo<DesignSystemContextValue>(
    () => ({
      theme: resolvedTheme,
      mode: resolvedTheme.mode,
      colorScheme: theme ? theme.mode : colorScheme,
    }),
    [resolvedTheme, theme, colorScheme],
  );

  const content = (
    <DesignSystemContext.Provider value={value}>
      <ThemeProvider theme={resolvedTheme}>{children}</ThemeProvider>
    </DesignSystemContext.Provider>
  );

  if (!safeAreaProvider) {
    return content;
  }

  return <SafeAreaProvider>{content}</SafeAreaProvider>;
}
