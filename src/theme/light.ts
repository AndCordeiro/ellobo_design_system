import { palette } from '../tokens/colors';
import { elevation } from '../tokens/elevation';
import { motion } from '../tokens/motion';
import { opacity } from '../tokens/opacity';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';
import { fontWeights, typographyVariants } from '../tokens/typography';
import { createComponentTokens } from './componentTokens';
import type { DesignSystemTheme } from './types';

const base: Omit<DesignSystemTheme, 'components'> = {
  mode: 'light',
  colors: {
    brand: {
      primary: palette.indigo[800],
      secondary: palette.violet[700],
      tertiary: palette.teal[700],
    },
    background: {
      primary: palette.white,
      secondary: palette.neutral[50],
      tertiary: palette.neutral[100],
      elevated: palette.white,
      inverse: palette.neutral[900],
      overlay: 'rgba(17, 24, 39, 0.55)',
      brandSubtle: palette.indigo[50],
    },
    content: {
      primary: palette.neutral[900],
      secondary: palette.neutral[600],
      tertiary: palette.neutral[500],
      disabled: palette.neutral[400],
      inverse: palette.white,
      brand: palette.indigo[800],
    },
    border: {
      primary: palette.neutral[200],
      secondary: palette.neutral[100],
      strong: palette.neutral[300],
      focus: palette.indigo[800],
      disabled: palette.neutral[200],
    },
    action: {
      primary: palette.indigo[800],
      primaryContent: palette.white,
      primaryPressed: palette.indigo[900],

      secondary: palette.neutral[100],
      secondaryContent: palette.neutral[900],
      secondaryPressed: palette.neutral[200],

      danger: palette.red[600],
      dangerContent: palette.white,
      dangerPressed: palette.red[700],

      disabled: palette.neutral[100],
      disabledContent: palette.neutral[400],
    },
    feedback: {
      success: palette.green[600],
      successBackground: palette.green[50],
      successContent: palette.green[700],

      warning: palette.amber[600],
      warningBackground: palette.amber[50],
      warningContent: palette.amber[700],

      error: palette.red[600],
      errorBackground: palette.red[50],
      errorContent: palette.red[700],

      info: palette.blue[600],
      infoBackground: palette.blue[50],
      infoContent: palette.blue[700],
    },
    shadow: palette.neutral[900],
  },
  typography: {
    fontFamily: {},
    fontWeight: { ...fontWeights },
    variants: { ...typographyVariants },
  },
  spacing: { ...spacing },
  radius: { ...radius },
  elevation: { ...elevation },
  opacity: { ...opacity },
  motion: { duration: { ...motion.duration } },
};

export const defaultLightTheme: DesignSystemTheme = {
  ...base,
  components: createComponentTokens(base),
};
