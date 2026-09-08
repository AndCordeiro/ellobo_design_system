import type { DesignSystemTheme } from './types';

/**
 * Makes `theme` fully typed inside styled-components templates, both for the library and for
 * consuming apps that import this package.
 */
declare module 'styled-components/native' {
  export interface DefaultTheme extends DesignSystemTheme {}
}
