# El Lobo Design System

Themeable, accessible React Native component library shared across El Lobo Labs apps.
Every app consumes the same components, contracts, spacing, typography structure, accessibility
and interaction patterns, while owning its own identity (colors, fonts, radius) through the theme.

- **Package name:** `@ellobo/design-system` (see [Package scope](#package-scope))
- **Repository:** `git@github.com:AndCordeiro/ellobo_design_system.git`
- **Status:** `0.x` — API may still change between minor versions until `1.0.0`.

## Stack

| Concern       | Choice                                        |
| ------------- | --------------------------------------------- |
| Runtime       | React Native ≥ 0.78, React ≥ 19               |
| Styling       | `styled-components/native` + theme tokens     |
| Icons         | `react-native-svg` (built-in, typed icon set) |
| Safe area     | `react-native-safe-area-context`              |
| Language      | TypeScript (strict)                           |
| Build         | `react-native-builder-bob` (CJS + ESM + d.ts) |
| Tests         | Jest + React Native Testing Library           |
| Versioning    | Semantic Versioning managed by Changesets     |
| CI / Releases | GitHub Actions (`ci.yml`, `release.yml`)      |

The library never depends on Expo. The `example/` app uses Expo only for convenience.

## Installation

Peer dependencies must be installed by the consuming app:

```bash
npm install @ellobo/design-system styled-components react-native-svg react-native-safe-area-context
```

Until the package is published to a registry you can install it straight from GitHub
(the `prepare` script builds `lib/` on install):

```bash
npm install github:AndCordeiro/ellobo_design_system#main
```

Then wrap the app root:

```tsx
import { DesignSystemProvider } from '@ellobo/design-system';

export function Root() {
  return (
    <DesignSystemProvider>
      <App />
    </DesignSystemProvider>
  );
}
```

`DesignSystemProvider` renders a `SafeAreaProvider` for you. Pass `safeAreaProvider={false}` if
your app already has one above it.

## Theme

### Semantic tokens

Components never read primitive colors (`indigo[800]`); they read semantic tokens that the theme
resolves for light and dark modes:

```text
Primitive tokens  →  Semantic tokens         →  Component tokens                  →  Components
indigo[800]          colors.action.primary      components.button.variants.primary   <Button />
```

```ts
theme.colors.brand.primary; // identity
theme.colors.background.primary; // surfaces
theme.colors.content.secondary; // text & icons
theme.colors.border.focus; // borders
theme.colors.action.primary; // interactive controls
theme.colors.feedback.error; // status
theme.typography.variants.bodyMedium;
theme.spacing.md; // 16 (aliases: none, xs, sm, md, lg, xl, 2xl, 3xl)
theme.radius.md; // 12
theme.elevation.sm; // iOS shadow + Android elevation
theme.opacity.disabled;
theme.motion.duration.fast;
theme.components.button.height.md;
```

### `createTheme`

Provide only what changes; everything else is inherited from the base theme (deep merge, fully
typed). Component tokens are re-derived from the merged semantic tokens, so changing
`colors.action.primary` or `radius.md` automatically updates buttons, inputs and cards.

```ts
import { createTheme, defaultDarkTheme } from '@ellobo/design-system';

export const lightTheme = createTheme({
  colors: {
    brand: { primary: '#2563EB' },
    action: { primary: '#2563EB', primaryPressed: '#1D4ED8' },
  },
  radius: { md: 16 },
  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semibold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
  },
});

export const darkTheme = createTheme(
  { colors: { brand: { primary: '#60A5FA' } } },
  defaultDarkTheme,
);
```

The library does not ship or load fonts. Load them in the app (e.g. `expo-font` or native
assets) and map the registered names through `typography.fontFamily`. When a family is set, the
library omits `fontWeight` so the native platform never synthesizes a fake bold.

### Light, dark and system

```tsx
<DesignSystemProvider lightTheme={lightTheme} darkTheme={darkTheme} colorScheme="system">
  <App />
</DesignSystemProvider>
```

- `colorScheme`: `'light' | 'dark' | 'system'` (default `system`, follows the OS appearance).
- `theme`: pass a single theme to bypass the light/dark resolution entirely.
- `useTheme()` returns the active theme; `useThemeMode()` returns `'light' | 'dark'`;
  `useDesignSystem()` returns both plus the configured preference.
- `useReducedMotion()` reports the OS "Reduce Motion" setting (animated components respect it).

Components contain no `if (isDark)` branches; the theme decides every value.

### Customizing components

Component tokens can be overridden without forking:

```ts
createTheme({
  components: {
    button: { height: { md: 48 }, borderRadius: 999 },
    input: { height: { md: 52 } },
  },
});
```

## Components

All exports come from the package root:

```ts
import {
  Button,
  Input,
  Card,
  Stack,
  Text,
  Icon,
  useTheme,
  createTheme,
} from '@ellobo/design-system';
```

| Group      | Components                                                                                                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout     | `Box`, `Stack`, `Column`, `Row`, `Center`, `Spacer`, `Divider`, `Container`, `Screen`, `ScrollScreen`, `Surface`                                                                                   |
| Typography | `Text` (variants), `Heading` (sizes), `Link`                                                                                                                                                       |
| Icons      | `Icon` (`IconName` union, `iconNames`)                                                                                                                                                             |
| Actions    | `Button` (primary/secondary/outline/ghost/danger · sm/md/lg · icons · loading), `IconButton`                                                                                                       |
| Forms      | `Input`, `PasswordInput`, `SearchInput`, `TextArea`, `DatePicker`/`Calendar`, `CurrencyInput`, `Checkbox`, `Radio`/`RadioGroup`, `Switch`, `FormField`, `FormLabel`, `FormError`, `FormHelperText` |
| Display    | `Card`, `PressableCard`, `Avatar`, `Badge`, `Chip`, `ColorSwatch`, `Tag`, `ListItem`, `StatusBadge`                                                                                                |
| Feedback   | `ActivityIndicator`, `LoadingOverlay`, `ProgressBar`, `Skeleton`, `Alert`, `EmptyState`, `ErrorState`, `SuccessState`                                                                              |
| Overlays   | `Modal`, `Dialog`, `ConfirmDialog`                                                                                                                                                                 |
| Navigation | `Header`, `BackButton`, `SegmentedControl`, `Tabs` (visual only — bring your own navigation library)                                                                                               |

Every component is documented with JSDoc (hover in the editor) and demonstrated in the example
app, which is the primary visual documentation.

### Example

```tsx
import {
  Button,
  Checkbox,
  Heading,
  Input,
  PasswordInput,
  Screen,
  Stack,
  Text,
} from '@ellobo/design-system';

export function SignInScreen() {
  return (
    <Screen>
      <Stack gap="lg">
        <Heading size="lg">Entrar</Heading>
        <Text color="secondary">Acesse sua conta.</Text>
        <Input label="E-mail" placeholder="seu@email.com" keyboardType="email-address" />
        <PasswordInput label="Senha" />
        <Checkbox checked label="Lembrar de mim" />
        <Button fullWidth size="lg">
          Continuar
        </Button>
      </Stack>
    </Screen>
  );
}
```

### Conventions

- Interactive components use `Pressable`, expose `accessibilityRole`/`accessibilityState`, and
  provide adequate touch targets (`hitSlop` where the visual size is small).
- Native props are inherited (`PressableProps`, `TextInputProps`, `ViewProps`,
  `ScrollViewProps`) without conflicting with the design-system API.
- `testID` and `style` are supported everywhere; global customization happens through the theme.
- Refs are regular props (React 19): `<Input ref={inputRef} />`.
- Default text labels (e.g. "Voltar", "Mostrar senha", "Carregando") are Portuguese and can be
  overridden through props.
- The icon outlines are based on the MIT-licensed [Feather](https://feathericons.com) set.

## Example app

`example/` is a standalone Expo app that renders the full gallery (foundations, components,
forms, feedback, overlays), a light/dark/system switcher, a brand switcher and a Playground
screen. It imports the library through its public name (`@ellobo/design-system`) resolved to
`src/`, so edits reload instantly.

```bash
npm install                  # library
npm run example:install      # example app (separate node_modules)

npm run example:start        # Metro + QR code (press "a" for Android, "i" for iOS)
npm run example:android      # native Android build (expo run:android)
npm run example:ios          # native iOS build (expo run:ios, macOS only)
npm run example:typecheck
```

Open the app in Expo Go from `example:start`, or build a dev client with `example:android` /
`example:ios`.

### Testing consumer apps with Jest

The package is consumed through its CommonJS build, so it needs no Babel transform in the
consumer's Jest setup. The peer libraries do, and `react-native-safe-area-context` must be
mocked:

```js
// jest.config.js
module.exports = {
  preset: '@react-native/jest-preset', // or 'jest-expo'
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-svg|react-native-safe-area-context)/)',
  ],
};

// jest.setup.js
jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);
```

## Development

```bash
npm run typecheck
npm run lint            # eslint (library + example)
npm run format          # prettier
npm run test            # jest
npm run test:watch
npm run build           # cleans lib/, syncs src/version.ts, runs bob
npm run validate        # typecheck + lint + test + build
```

### Build output

`npm run build` produces:

- `lib/commonjs/` — CommonJS (used by `require`, e.g. Jest in consumer apps)
- `lib/module/` — ESM (used by Metro/bundlers)
- `lib/typescript/` — declaration files (+ maps) for both entry points
- source maps for every file

`package.json#exports` wires `import`/`require`/`types`; `src/` is shipped for source maps and
tooling that prefers the `source` condition.

### Testing the package locally in another app

Test the real tarball exactly as consumers get it:

```bash
npm run build
npm pack                                  # creates ellobo-design-system-<version>.tgz
cd ../my-app && npm install ../ellobo_design_system/ellobo-design-system-0.1.0.tgz
```

Avoid `npm install ../ellobo_design_system` (symlink): Metro would then resolve React and
React Native from this repository's `node_modules` and crash with duplicated React instances
unless you configure `watchFolders`/`blockList` in the consumer app.

Inspect what would be published with `npm pack --dry-run`.

## Versioning & Releases

The library follows [Semantic Versioning](https://semver.org): `MAJOR.MINOR.PATCH`.
While in `0.x`, breaking changes bump the minor version.

| Bump      | Use for                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------- |
| **patch** | Bug fixes, accessibility fixes, visual corrections, performance, behavior fixes without API change               |
| **minor** | New component, new variant, new optional prop, new token, new feature                                            |
| **major** | Renamed/removed props, removed components or tokens, theme contract changes, incompatible behavior (after 1.0.0) |

Everything exported from the package root (components, props, types, hooks, tokens, theme
contracts, functions) is public API.

### Workflow with Changesets

1. Make the change in a branch.
2. Describe it:

   ```bash
   npm run changeset
   ```

   Choose `patch` / `minor` / `major` and write a message useful to consumers
   (e.g. "Adds `SegmentedControl`", "Fixes Button alignment while loading").

3. Open a Pull Request. `ci.yml` runs typecheck, lint, tests and build.
4. Merge to `main`.

Versioning locally (does **not** publish):

```bash
npm run version     # changeset version + sync src/version.ts + lockfile refresh
git diff            # review package.json, CHANGELOG.md, src/version.ts
```

`package.json` is the single source of truth for the version: `src/version.ts`
(`designSystemVersion`) is generated from it and verified by a test and by CI.
Avoid `npm version`; use Changesets.

### Version PR and GitHub Releases

`release.yml` runs on every push to `main`:

- With pending changesets, it opens or updates the **Version PR**
  (`chore: release design system`) containing the new version, the updated `CHANGELOG.md` and the
  consumed changesets. Review it — the version only becomes official after this PR is merged.
- When the Version PR is merged, the workflow validates the package again
  (typecheck, lint, test, build), creates the git tag `vX.Y.Z` and the GitHub Release
  `vX.Y.Z` with the notes extracted from `CHANGELOG.md` (`npm run release:notes`).
  Any failing validation aborts before tagging.

The workflow needs the repository setting **Settings → Actions → General → "Allow GitHub
Actions to create and approve pull requests"** enabled, otherwise the Version PR cannot be opened.

Feature merges never create releases by themselves. No automated registry publish is configured.

### Prereleases and snapshots (future)

Changesets already supports both; they are not part of the normal flow yet.

```bash
npx changeset pre enter beta   # versions become 1.2.0-beta.0, 1.2.0-beta.1…
npx changeset pre exit

npx changeset version --snapshot preview   # e.g. 0.0.0-preview-20260908
npm pack                                   # share the tarball with another app for testing
```

## Package scope

The repository lives under the personal account `AndCordeiro`, so the `@ellobo` scope is not
available on GitHub Packages (scopes must match the owner). To publish there:

1. Rename `name` in `package.json` to `@andcordeiro/ellobo-design-system`
   (imports change to that name; the design system itself remains "El Lobo Design System").
2. Add to `package.json`:

   ```json
   "publishConfig": { "registry": "https://npm.pkg.github.com" }
   ```

3. In `release.yml`, add `publish: npm run release` to the `changesets/action` step and keep
   `GITHUB_TOKEN` (it can publish to GitHub Packages for the same repository; a PAT with
   `write:packages` is only needed for other repositories). The tag/release step can then be
   removed, since `changeset publish` creates the tag itself.
4. Consumers add an `.npmrc` with `@andcordeiro:registry=https://npm.pkg.github.com` and a token
   with `read:packages`.

Never commit tokens; use GitHub Secrets and environment variables.

## Contributing

- Keep components theme-driven: no hardcoded colors, sizes from tokens, no `isDark` branches.
- Follow the component structure: `Component.tsx`, `styles.ts`, `types.ts`, `Component.test.tsx`,
  `index.ts` (colocation first).
- Add tests for behavior and public contract, not implementation details.
- Add a changeset for every user-facing change.
- Conventional Commits are encouraged (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`), but
  Changesets is the source of truth for versioning.

## License

MIT © André Cordeiro
