# @ellobo/design-system

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
