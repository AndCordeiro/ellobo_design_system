import type { DesignSystemTheme, ThemeComponents } from './types';

type BaseTheme = Omit<DesignSystemTheme, 'components'>;

/**
 * Derives default component tokens from the semantic tokens of a theme. Because this runs inside
 * `createTheme`, changing `colors.action.primary` or `radius.md` automatically propagates to
 * buttons, inputs and cards unless a component token is explicitly overridden.
 */
export function createComponentTokens(theme: BaseTheme): ThemeComponents {
  const { colors, radius, spacing } = theme;
  const transparent = 'transparent';

  return {
    button: {
      height: { sm: 36, md: 44, lg: 52 },
      paddingHorizontal: { sm: spacing[3], md: spacing[4], lg: spacing[5] },
      iconSize: { sm: 16, md: 18, lg: 20 },
      typography: { sm: 'labelMedium', md: 'labelLarge', lg: 'titleMedium' },
      borderRadius: radius.md,
      variants: {
        primary: {
          background: colors.action.primary,
          content: colors.action.primaryContent,
          pressedBackground: colors.action.primaryPressed,
          borderColor: transparent,
          borderWidth: 0,
        },
        secondary: {
          background: colors.action.secondary,
          content: colors.action.secondaryContent,
          pressedBackground: colors.action.secondaryPressed,
          borderColor: transparent,
          borderWidth: 0,
        },
        outline: {
          background: transparent,
          content: colors.content.primary,
          pressedBackground: colors.action.secondary,
          borderColor: colors.border.strong,
          borderWidth: 1,
        },
        ghost: {
          background: transparent,
          content: colors.content.brand,
          pressedBackground: colors.background.brandSubtle,
          borderColor: transparent,
          borderWidth: 0,
        },
        danger: {
          background: colors.action.danger,
          content: colors.action.dangerContent,
          pressedBackground: colors.action.dangerPressed,
          borderColor: transparent,
          borderWidth: 0,
        },
      },
    },
    input: {
      height: { sm: 40, md: 48, lg: 56 },
      paddingHorizontal: spacing[3],
      borderRadius: radius.md,
      borderWidth: 1,
      background: colors.background.primary,
      disabledBackground: colors.background.secondary,
      borderColor: colors.border.primary,
      focusBorderColor: colors.border.focus,
      errorBorderColor: colors.feedback.error,
      successBorderColor: colors.feedback.success,
      placeholderColor: colors.content.tertiary,
      textColor: colors.content.primary,
      disabledTextColor: colors.content.disabled,
    },
    card: {
      borderRadius: radius.lg,
      padding: spacing[4],
      background: colors.background.elevated,
      outlinedBorderColor: colors.border.primary,
      filledBackground: colors.background.secondary,
      elevation: 'sm',
    },
  };
}
