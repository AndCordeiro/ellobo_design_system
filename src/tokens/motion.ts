/**
 * Motion tokens (durations in milliseconds).
 */
export const motion = {
  duration: {
    instant: 0,
    fast: 150,
    normal: 250,
    slow: 400,
  },
} as const;

export type MotionDurationToken = keyof typeof motion.duration;
