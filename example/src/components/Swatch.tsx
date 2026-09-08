import { Box, Row, Stack, Text } from '@ellobo/design-system';

interface SwatchProps {
  name: string;
  value: string;
}

/**
 * Color token preview.
 */
export function Swatch({ name, value }: SwatchProps) {
  return (
    <Row gap="md" align="center">
      <Box
        width={44}
        height={44}
        borderRadius="md"
        borderColor="primary"
        style={{ backgroundColor: value }}
      />
      <Stack gap="none" flex={1}>
        <Text variant="labelLarge">{name}</Text>
        <Text variant="caption" color="tertiary">
          {value}
        </Text>
      </Stack>
    </Row>
  );
}
