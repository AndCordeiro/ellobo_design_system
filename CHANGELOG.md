# @ellobo/design-system

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
