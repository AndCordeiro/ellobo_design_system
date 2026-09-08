import { Stack } from '../Stack/Stack';
import type { StackProps } from '../Stack/types';

export type ColumnProps = StackProps;

/**
 * Explicit vertical layout. Shares its implementation with `Stack`; use whichever reads better
 * next to `Row`.
 */
export function Column(props: ColumnProps) {
  return <Stack {...props} />;
}
