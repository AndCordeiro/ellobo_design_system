/**
 * Opacity tokens for interaction and layering states.
 */
export const opacity = {
  disabled: 0.4,
  pressed: 0.72,
  overlay: 0.5,
  subtle: 0.6,
  skeleton: 0.5,
} as const;

export type OpacityToken = keyof typeof opacity;
