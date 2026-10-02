import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getColorSwatchStyles } from './styles';
import type { ColorSwatchProps } from './types';

export function ColorSwatch({
  color,
  accessibilityLabel,
  selected = false,
  onPress,
  size = 'md',
  disabled = false,
  style,
  testID,
}: ColorSwatchProps) {
  const theme = useTheme();
  const styles = getColorSwatchStyles(theme, { color, size, selected, disabled });
  const accessibilityState = { selected, disabled };

  if (!onPress) {
    return (
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={accessibilityState}
        style={[styles.container, style]}
        testID={testID}
      >
        <View style={styles.fill} />
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      disabled={disabled}
      hitSlop={styles.hitSlop}
      onPress={onPress}
      style={[styles.container, style]}
      testID={testID}
    >
      {({ pressed }) => <View style={pressed && !disabled ? styles.fillPressed : styles.fill} />}
    </Pressable>
  );
}
