import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { BackgroundColorToken } from '../../theme/types';

export const ScreenRoot = styled(SafeAreaView)<{ $background: BackgroundColorToken }>`
  flex: 1;
  background-color: ${({ theme, $background }) => theme.colors.background[$background]};
`;
