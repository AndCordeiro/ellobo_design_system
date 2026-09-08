import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';
import type { BackgroundColorToken } from '../../theme/types';
import { Text } from '../../typography/Text/Text';

export interface HeaderProps extends ViewProps {
  title?: string;
  subtitle?: string;
  /** Slot at the start (usually `<BackButton />`). */
  left?: ReactNode;
  /** Slot at the end (actions). */
  right?: ReactNode;
  /** Adds the top safe-area inset. Use when the header is not inside `Screen`. */
  safeArea?: boolean;
  /** Draws a bottom border. Defaults to `false`. */
  bordered?: boolean;
  /** Background token. Defaults to `primary`. */
  background?: BackgroundColorToken;
  /** Centers the title. Defaults to `true`. */
  centered?: boolean;
}

const HEADER_HEIGHT = 56;
const SLOT_MIN_WIDTH = 40;

/**
 * Screen header with title, subtitle and action slots. Navigation behaviour is provided by the
 * consumer (e.g. `left={<BackButton onPress={navigation.goBack} />}`).
 */
export function Header({
  title,
  subtitle,
  left,
  right,
  safeArea = false,
  bordered = false,
  background = 'primary',
  centered = true,
  style,
  ...rest
}: HeaderProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: safeArea ? insets.top : 0,
          backgroundColor: theme.colors.background[background],
          borderBottomWidth: bordered ? 1 : 0,
          borderBottomColor: theme.colors.border.primary,
        },
        style,
      ]}
      {...rest}
    >
      <View
        style={{
          minHeight: HEADER_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.sm,
          gap: theme.spacing.xs,
        }}
      >
        <View style={{ minWidth: SLOT_MIN_WIDTH, flexDirection: 'row', alignItems: 'center' }}>
          {left}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: centered ? 'center' : 'flex-start',
            paddingHorizontal: theme.spacing.xs,
          }}
        >
          {title ? (
            <Text
              variant="titleMedium"
              accessibilityRole="header"
              numberOfLines={1}
              align={centered ? 'center' : 'left'}
            >
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              variant="bodySmall"
              color="secondary"
              numberOfLines={1}
              align={centered ? 'center' : 'left'}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            minWidth: SLOT_MIN_WIDTH,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: theme.spacing.xs,
          }}
        >
          {right}
        </View>
      </View>
    </View>
  );
}
