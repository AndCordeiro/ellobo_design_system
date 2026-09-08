import { deepDiff, deepMerge } from '../utils/deepMerge';
import { createComponentTokens } from './componentTokens';
import { defaultLightTheme } from './light';
import type { DesignSystemTheme, ThemeOverrides } from './types';

/**
 * Creates a complete theme by deep-merging `overrides` over `baseTheme`
 * (`defaultLightTheme` by default).
 *
 * Only the values you provide are replaced; every other token is inherited from the base theme.
 * Component tokens (`theme.components`) are re-derived from the merged semantic tokens, so
 * changing `colors.brand.primary` or `radius.md` is reflected in buttons, inputs and cards.
 * Explicit `components` overrides always win.
 *
 * @example
 * const theme = createTheme({ colors: { brand: { primary: '#2563EB' } } });
 * const dark = createTheme({ colors: { brand: { primary: '#60A5FA' } } }, defaultDarkTheme);
 */
export function createTheme(
  overrides: ThemeOverrides = {},
  baseTheme: DesignSystemTheme = defaultLightTheme,
): DesignSystemTheme {
  const { components: componentOverrides, ...tokenOverrides } = overrides;
  const { components: baseComponents, ...baseTokens } = baseTheme;

  // Only the intentional component customizations of the base theme are carried over.
  const baseComponentCustomizations = deepDiff(baseComponents, createComponentTokens(baseTokens));

  const mergedTokens = deepMerge(baseTokens, tokenOverrides);

  const components = deepMerge(
    deepMerge(createComponentTokens(mergedTokens), baseComponentCustomizations),
    componentOverrides,
  );

  return { ...mergedTokens, components };
}
