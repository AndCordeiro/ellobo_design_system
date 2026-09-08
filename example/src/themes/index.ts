import {
  createTheme,
  defaultDarkTheme,
  defaultLightTheme,
  type DesignSystemTheme,
  type ThemeOverrides,
} from '@ellobo/design-system';
import type { BrandId } from '../state/AppSettings';

/**
 * "Demo Brand": a warm identity with rounder corners. It changes brand colors, semantic colors
 * and radius exclusively through the theme — no component was modified for it.
 */
const demoRadius: ThemeOverrides['radius'] = {
  xs: 8,
  sm: 12,
  md: 20,
  lg: 24,
  xl: 32,
};

const demoLightOverrides: ThemeOverrides = {
  colors: {
    brand: { primary: '#C2410C', secondary: '#B45309', tertiary: '#4D7C0F' },
    background: {
      primary: '#FFFCF9',
      secondary: '#FFF6EE',
      tertiary: '#FDEBDD',
      elevated: '#FFFFFF',
      brandSubtle: '#FFEDD5',
    },
    content: { primary: '#2A1A12', secondary: '#6B4F3F', tertiary: '#8C7364', brand: '#C2410C' },
    border: { primary: '#F2DFD0', secondary: '#FBEFE4', strong: '#E4C7B2', focus: '#C2410C' },
    action: {
      primary: '#C2410C',
      primaryPressed: '#9A3412',
      secondary: '#FDEBDD',
      secondaryContent: '#2A1A12',
      secondaryPressed: '#F8D9C2',
    },
    feedback: { info: '#0E7490', infoBackground: '#ECFEFF', infoContent: '#155E75' },
    shadow: '#5A2E14',
  },
  radius: demoRadius,
};

const demoDarkOverrides: ThemeOverrides = {
  colors: {
    brand: { primary: '#FB923C', secondary: '#FBBF24', tertiary: '#A3E635' },
    background: {
      primary: '#171210',
      secondary: '#1F1815',
      tertiary: '#2A201B',
      elevated: '#231B17',
      brandSubtle: '#3A2416',
    },
    content: { primary: '#FBF5F0', secondary: '#D9C7BA', tertiary: '#A88F80', brand: '#FDBA74' },
    border: { primary: '#33261F', secondary: '#271D18', strong: '#4A3730', focus: '#FB923C' },
    action: {
      primary: '#FB923C',
      primaryContent: '#1B110B',
      primaryPressed: '#FDBA74',
      secondary: '#2A201B',
      secondaryContent: '#FBF5F0',
      secondaryPressed: '#3A2C25',
    },
    shadow: '#000000',
  },
  radius: demoRadius,
};

export interface BrandDefinition {
  id: BrandId;
  name: string;
  description: string;
  light: DesignSystemTheme;
  dark: DesignSystemTheme;
}

export const brands: Record<BrandId, BrandDefinition> = {
  default: {
    id: 'default',
    name: 'El Lobo (padrão)',
    description: 'Tema neutro e premium que acompanha a biblioteca.',
    light: defaultLightTheme,
    dark: defaultDarkTheme,
  },
  demo: {
    id: 'demo',
    name: 'Demo Brand',
    description: 'Identidade quente com cantos mais arredondados, criada só com createTheme().',
    light: createTheme(demoLightOverrides),
    dark: createTheme(demoDarkOverrides, defaultDarkTheme),
  },
};
