import type { ReactNode } from 'react';
import { Heading, Stack, Text } from '@ellobo/design-system';

interface DemoSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Titled block used to group component states inside a gallery screen.
 */
export function DemoSection({ title, description, children }: DemoSectionProps) {
  return (
    <Stack gap="md">
      <Stack gap="xs">
        <Heading size="sm">{title}</Heading>
        {description ? (
          <Text variant="bodySmall" color="secondary">
            {description}
          </Text>
        ) : null}
      </Stack>
      {children}
    </Stack>
  );
}
