import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ColorSchemePreference } from '@ellobo/design-system';

export type BrandId = 'default' | 'demo';

export interface AppSettings {
  colorScheme: ColorSchemePreference;
  setColorScheme: (value: ColorSchemePreference) => void;
  brand: BrandId;
  setBrand: (value: BrandId) => void;
}

const AppSettingsContext = createContext<AppSettings | null>(null);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorSchemePreference>('system');
  const [brand, setBrand] = useState<BrandId>('default');

  const value = useMemo<AppSettings>(
    () => ({ colorScheme, setColorScheme, brand, setBrand }),
    [colorScheme, brand],
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

export function useAppSettings(): AppSettings {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used inside AppSettingsProvider');
  }
  return context;
}
