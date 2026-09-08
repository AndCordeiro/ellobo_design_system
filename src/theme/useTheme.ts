import { useContext } from 'react';
import { DesignSystemContext, type DesignSystemContextValue } from './DesignSystemProvider';
import type { DesignSystemTheme, ThemeMode } from './types';

function useDesignSystemContext(hookName: string): DesignSystemContextValue {
  const context = useContext(DesignSystemContext);
  if (context === null) {
    throw new Error(
      `[@ellobo/design-system] ${hookName} must be used inside <DesignSystemProvider>. ` +
        'Wrap your application root with <DesignSystemProvider theme={theme}>.',
    );
  }
  return context;
}

/**
 * Returns the active, fully-typed design system theme.
 * Throws a descriptive error when used outside of `DesignSystemProvider`.
 */
export function useTheme(): DesignSystemTheme {
  return useDesignSystemContext('useTheme').theme;
}

/**
 * Returns the resolved color mode (`light` | `dark`) of the active theme.
 */
export function useThemeMode(): ThemeMode {
  return useDesignSystemContext('useThemeMode').mode;
}

/**
 * Returns the full provider context (theme, resolved mode and the configured preference).
 */
export function useDesignSystem(): DesignSystemContextValue {
  return useDesignSystemContext('useDesignSystem');
}
