import { createTheme } from './createTheme';
import { defaultDarkTheme } from './dark';
import { defaultLightTheme } from './light';
import type { DesignSystemTheme } from './types';

function collectLeaves(
  value: unknown,
  path: string[] = [],
): Array<{ path: string; value: unknown }> {
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => collectLeaves(child, [...path, key]));
  }
  return [{ path: path.join('.'), value }];
}

function paths(theme: DesignSystemTheme): string[] {
  return (
    collectLeaves(theme)
      .map((leaf) => leaf.path)
      // Font families are optional by design (system font when absent).
      .filter((path) => !path.startsWith('typography.fontFamily.'))
      .sort()
  );
}

describe('default themes', () => {
  it('exposes light and dark modes', () => {
    expect(defaultLightTheme.mode).toBe('light');
    expect(defaultDarkTheme.mode).toBe('dark');
  });

  it('light and dark themes share the exact same token structure', () => {
    expect(paths(defaultDarkTheme)).toEqual(paths(defaultLightTheme));
  });

  it('defines every color token as a non-empty string', () => {
    for (const theme of [defaultLightTheme, defaultDarkTheme]) {
      for (const leaf of collectLeaves(theme.colors)) {
        expect(typeof leaf.value).toBe('string');
        expect((leaf.value as string).length).toBeGreaterThan(0);
      }
    }
  });

  it('derives component tokens from semantic tokens', () => {
    expect(defaultLightTheme.components.button.variants.primary.background).toBe(
      defaultLightTheme.colors.action.primary,
    );
    expect(defaultLightTheme.components.input.borderRadius).toBe(defaultLightTheme.radius.md);
    expect(defaultDarkTheme.components.card.background).toBe(
      defaultDarkTheme.colors.background.elevated,
    );
  });

  it('exposes the spacing scale with semantic aliases', () => {
    expect(defaultLightTheme.spacing[4]).toBe(16);
    expect(defaultLightTheme.spacing.md).toBe(16);
    expect(defaultLightTheme.spacing.lg).toBe(24);
    expect(defaultLightTheme.spacing.none).toBe(0);
  });
});

describe('createTheme', () => {
  it('returns the light theme when called without overrides', () => {
    expect(createTheme()).toEqual(defaultLightTheme);
  });

  it('does not mutate the base theme', () => {
    const snapshot = JSON.stringify(defaultLightTheme);
    createTheme({ colors: { brand: { primary: '#000000' } }, radius: { md: 2 } });
    expect(JSON.stringify(defaultLightTheme)).toBe(snapshot);
  });

  it('deep-merges partial overrides and preserves sibling tokens', () => {
    const theme = createTheme({ colors: { brand: { primary: '#000' } } });

    expect(theme.colors.brand.primary).toBe('#000');
    expect(theme.colors.brand.secondary).toBe(defaultLightTheme.colors.brand.secondary);
    expect(theme.colors.brand.tertiary).toBe(defaultLightTheme.colors.brand.tertiary);
    expect(theme.colors.background).toEqual(defaultLightTheme.colors.background);
    expect(theme.typography).toEqual(defaultLightTheme.typography);
  });

  it('keeps the full structure after overriding several groups', () => {
    const theme = createTheme({
      colors: { action: { primary: '#123456' }, feedback: { error: '#FF0000' } },
      radius: { md: 4 },
      spacing: { md: 20 },
      typography: { fontFamily: { bold: 'Poppins-Bold' } },
    });

    expect(paths(theme)).toEqual(paths(defaultLightTheme));
    expect(theme.colors.action.primary).toBe('#123456');
    expect(theme.colors.action.primaryContent).toBe(defaultLightTheme.colors.action.primaryContent);
    expect(theme.colors.feedback.error).toBe('#FF0000');
    expect(theme.colors.feedback.success).toBe(defaultLightTheme.colors.feedback.success);
    expect(theme.radius.md).toBe(4);
    expect(theme.radius.lg).toBe(defaultLightTheme.radius.lg);
    expect(theme.spacing.md).toBe(20);
    expect(theme.spacing.lg).toBe(24);
    expect(theme.typography.fontFamily.bold).toBe('Poppins-Bold');
    expect(theme.typography.fontFamily.regular).toBeUndefined();
    expect(theme.typography.variants.bodyMedium).toEqual(
      defaultLightTheme.typography.variants.bodyMedium,
    );
  });

  it('propagates semantic overrides into derived component tokens', () => {
    const theme = createTheme({
      colors: { action: { primary: '#7C3AED', primaryPressed: '#6D28D9' } },
      radius: { md: 999 },
    });

    expect(theme.components.button.variants.primary.background).toBe('#7C3AED');
    expect(theme.components.button.variants.primary.pressedBackground).toBe('#6D28D9');
    expect(theme.components.button.borderRadius).toBe(999);
    expect(theme.components.input.borderRadius).toBe(999);
  });

  it('applies explicit component token overrides on top of derived ones', () => {
    const theme = createTheme({
      components: {
        button: { height: { md: 60 }, variants: { primary: { content: '#111111' } } },
      },
    });

    expect(theme.components.button.height.md).toBe(60);
    expect(theme.components.button.height.sm).toBe(defaultLightTheme.components.button.height.sm);
    expect(theme.components.button.variants.primary.content).toBe('#111111');
    expect(theme.components.button.variants.primary.background).toBe(
      defaultLightTheme.colors.action.primary,
    );
  });

  it('preserves component customizations of a custom base theme', () => {
    const base = createTheme({ components: { button: { height: { md: 60 } } } });
    const derived = createTheme({ colors: { action: { primary: '#ABCDEF' } } }, base);

    expect(derived.components.button.height.md).toBe(60);
    expect(derived.components.button.variants.primary.background).toBe('#ABCDEF');
  });

  it('supports the dark theme as base', () => {
    const theme = createTheme({ colors: { brand: { primary: '#60A5FA' } } }, defaultDarkTheme);

    expect(theme.mode).toBe('dark');
    expect(theme.colors.brand.primary).toBe('#60A5FA');
    expect(theme.colors.background.primary).toBe(defaultDarkTheme.colors.background.primary);
  });

  it('ignores undefined values inside overrides', () => {
    const theme = createTheme({ colors: { brand: { primary: undefined } } });
    expect(theme.colors.brand.primary).toBe(defaultLightTheme.colors.brand.primary);
  });
});
