# @ellobo/design-system

## 0.5.1

### Patch Changes

- 7b24e9b: fix: `ScrollScreen` footer sits right on the keyboard
  
  With the bottom safe-area edge (the default), the sticky footer used to float one inset above the
  keyboard (Android navigation bar, iOS home indicator), leaving a transparent gap where the content
  showed through. The keyboard height already covers that inset, so the footer now gets it back as the
  open offset.

## 0.5.0

### Minor Changes

- feat: add ColorSwatch
  
  Adds `ColorSwatch`: circular color sample for color pickers and palettes. Supports `selected`
  (focus-colored ring with a gap), `onPress` (renders as a non-interactive image when absent),
  `disabled`, and `sm`/`md`/`lg` sizes (24/32/40) with a minimum 44pt touch target. A hairline
  border keeps very light or very dark colors visible on any background.

## 0.4.0

### Minor Changes

- b406855: Adds `CurrencyInput`: money field with an ATM-style mask driven by `Intl` (`currency` + `locale`),
  so the same component renders `59,90` for BRL/pt-BR, `12,345.67` for USD/en-US or `1,234` for
  JPY. Values are integers in the currency's minor unit. Also exports `formatCurrency`,
  `formatMinorUnits`, `currencySymbol`, `minorUnitDigits` and `digitsToMinorUnits`.

- b406855: Keyboard handling built in: `Screen`, `ScrollScreen` and `Modal` now use
  `react-native-keyboard-controller`, so the focused field scrolls into view and footers stick to the
  keyboard instead of being covered. Apps must add `react-native-keyboard-controller` and
  `react-native-reanimated` and wrap their root with the exported `KeyboardProvider`.
  `ScrollScreen` gains `keyboardBottomOffset`.

## 0.3.0

### Minor Changes

- 9f29a3b: Adds `DatePicker` (date field that opens a calendar in a bottom sheet) and `Calendar` (inline
  month grid). Values are ISO dates (`YYYY-MM-DD`); supports `minDate`/`maxDate`, locale-aware
  month and weekday names, `clearable`, custom labels and full accessibility (each day is a button
  labelled with the long date).

## 0.2.0

### Minor Changes

- e53899f: Adds icons for product categories, recurring billing and finance: `tv`, `monitor`, `music`,
  `cloud`, `book-open`, `activity`, `file-text`, `phone`, `dollar-sign`, `play-circle`,
  `trending-up`, `trending-down`, `pie-chart`, `bar-chart`, `repeat`, `tag`, `award`, `percent`,
  `shield`, `target`, `clipboard` and `gift`.

## 0.1.0

Initial foundation of the El Lobo Design System.

### Foundations

- Theme contract with semantic tokens (brand, background, content, border, action, feedback),
  typography scale, spacing, radius, elevation, opacity and motion.
- `defaultLightTheme`, `defaultDarkTheme`, `createTheme` (typed deep merge with derived component
  tokens), `DesignSystemProvider`, `useTheme`, `useThemeMode`, `useDesignSystem`,
  `useReducedMotion`.
- `designSystemVersion` mirrored from `package.json`.

### Components

- Layout: Box, Stack, Column, Row, Center, Spacer, Divider, Container, Screen, ScrollScreen,
  Surface.
- Typography: Text, Heading, Link.
- Icons: Icon with a strongly-typed built-in icon set.
- Actions: Button, IconButton.
- Forms: Input, PasswordInput, SearchInput, TextArea, Checkbox, Radio, RadioGroup, Switch,
  FormField, FormLabel, FormError, FormHelperText.
- Display: Card, PressableCard, Avatar, Badge, Chip, Tag, ListItem, StatusBadge.
- Feedback: ActivityIndicator, LoadingOverlay, ProgressBar, Skeleton, Alert, EmptyState,
  ErrorState, SuccessState.
- Overlays: Modal, Dialog, ConfirmDialog.
- Navigation (visual only): Header, BackButton, SegmentedControl, Tabs.
