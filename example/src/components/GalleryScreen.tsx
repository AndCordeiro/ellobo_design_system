import type { ReactNode } from 'react';
import {
  BackButton,
  Header,
  ScrollScreen,
  Stack,
  type ScrollScreenProps,
} from '@ellobo/design-system';
import { useNavigation } from '../navigation/Navigator';
import { ThemeToggle } from './ThemeToggle';

interface GalleryScreenProps extends Omit<ScrollScreenProps, 'header'> {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * Standard gallery screen: header with back button, theme toggle and scrollable content.
 */
export function GalleryScreen({ title, subtitle, children, ...rest }: GalleryScreenProps) {
  const navigation = useNavigation();

  return (
    <ScrollScreen
      edges={['top', 'left', 'right']}
      header={
        <Header
          title={title}
          subtitle={subtitle}
          left={navigation.canGoBack ? <BackButton onPress={navigation.goBack} /> : undefined}
          right={<ThemeToggle />}
          bordered
        />
      }
      {...rest}
    >
      <Stack gap="xl" paddingBottom="2xl">
        {children}
      </Stack>
    </ScrollScreen>
  );
}
