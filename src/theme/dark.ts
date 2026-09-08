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
  mode: 'dark',
  colors: {
    brand: {
      primary: palette.indigo[400],
      secondary: palette.violet[400],
      tertiary: palette.teal[400],
    },
    background: {
      primary: palette.neutral[950],
      secondary: '#121826',
      tertiary: '#1B2333',
      elevated: '#161D2B',
      inverse: palette.neutral[50],
      overlay: 'rgba(0, 0, 0, 0.65)',
      brandSubtle: '#1A2140',
    },
    content: {
      primary: palette.neutral[50],
      secondary: palette.neutral[300],
      tertiary: palette.neutral[400],
      disabled: palette.neutral[500],
      inverse: palette.neutral[900],
      brand: palette.indigo[300],
    },
    border: {
      primary: palette.neutral[800],
      secondary: '#172033',
      strong: palette.neutral[700],
      focus: palette.indigo[400],
      disabled: palette.neutral[800],
    },
    action: {
      primary: palette.indigo[400],
      primaryContent: palette.neutral[950],
      primaryPressed: palette.indigo[300],

      secondary: palette.neutral[800],
      secondaryContent: palette.neutral[50],
      secondaryPressed: palette.neutral[700],

      danger: palette.red[400],
      dangerContent: palette.neutral[950],
      dangerPressed: palette.red[300],

      disabled: palette.neutral[800],
      disabledContent: palette.neutral[500],
    },
    feedback: {
      success: palette.green[400],
      successBackground: palette.green[950],
      successContent: palette.green[300],

      warning: palette.amber[400],
      warningBackground: palette.amber[950],
      warningContent: palette.amber[300],

      error: palette.red[400],
      errorBackground: palette.red[950],
      errorContent: palette.red[300],

      info: palette.blue[400],
      infoBackground: palette.blue[950],
      infoContent: palette.blue[300],
    },
    shadow: palette.black,
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

export const defaultDarkTheme: DesignSystemTheme = {
  ...base,
  components: createComponentTokens(base),
};
