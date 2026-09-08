import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AccessibilityInfo, useColorScheme } from 'react-native';
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
  /** Whether the OS "Reduce Motion" accessibility setting is enabled. */
  reducedMotion: boolean;
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

/**
 * Subscribes once to the OS "Reduce Motion" setting so every animated component can read it
 * from context instead of registering its own listener.
 */
function useReducedMotionSetting(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (mounted) {
          setReduced(enabled);
        }
      })
      .catch(() => undefined);

    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return reduced;
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
  const reducedMotion = useReducedMotionSetting();

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
      reducedMotion,
    }),
    [resolvedTheme, theme, colorScheme, reducedMotion],
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
