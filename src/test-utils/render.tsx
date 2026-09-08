import { render, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';
import { DesignSystemProvider } from '../theme/DesignSystemProvider';
import { defaultLightTheme } from '../theme/light';
import type { DesignSystemTheme } from '../theme/types';

interface Options extends RenderOptions {
  theme?: DesignSystemTheme;
}

export function renderWithTheme(
  ui: ReactElement,
  { theme = defaultLightTheme, ...options }: Options = {},
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <DesignSystemProvider theme={theme} safeAreaProvider={false}>
      {children}
    </DesignSystemProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react-native';
