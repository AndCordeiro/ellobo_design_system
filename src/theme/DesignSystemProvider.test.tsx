import { render, renderHook } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { Text as RNText } from 'react-native';
import { DesignSystemProvider } from './DesignSystemProvider';
import { defaultDarkTheme } from './dark';
import { defaultLightTheme } from './light';
import { useTheme, useThemeMode } from './useTheme';

function wrapperFor(props: Omit<Parameters<typeof DesignSystemProvider>[0], 'children'>) {
  return ({ children }: { children: ReactNode }) => (
    <DesignSystemProvider safeAreaProvider={false} {...props}>
      {children}
    </DesignSystemProvider>
  );
}

describe('DesignSystemProvider', () => {
  it('provides the explicit theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: wrapperFor({ theme: defaultDarkTheme }),
    });
    expect(result.current).toBe(defaultDarkTheme);
  });

  it('resolves light and dark themes from colorScheme', () => {
    const dark = renderHook(() => useThemeMode(), { wrapper: wrapperFor({ colorScheme: 'dark' }) });
    expect(dark.result.current).toBe('dark');

    const light = renderHook(() => useTheme(), { wrapper: wrapperFor({ colorScheme: 'light' }) });
    expect(light.result.current).toBe(defaultLightTheme);
  });

  it('throws a descriptive error outside of the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    function Consumer() {
      const theme = useTheme();
      return <RNText>{theme.mode}</RNText>;
    }

    expect(() => render(<Consumer />)).toThrow(/must be used inside <DesignSystemProvider>/);
    spy.mockRestore();
  });
});
