---
'@ellobo/design-system': minor
---

Keyboard handling built in: `Screen`, `ScrollScreen` and `Modal` now use
`react-native-keyboard-controller`, so the focused field scrolls into view and footers stick to the
keyboard instead of being covered. Apps must add `react-native-keyboard-controller` and
`react-native-reanimated` and wrap their root with the exported `KeyboardProvider`.
`ScrollScreen` gains `keyboardBottomOffset`.
