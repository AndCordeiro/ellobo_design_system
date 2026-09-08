import { KeyboardAvoidingView, Platform, View, type ViewStyle } from 'react-native';
import { LoadingOverlay } from '../../feedback/LoadingOverlay/LoadingOverlay';
import { useTheme } from '../../theme/useTheme';
import { ScreenRoot } from './styles';
import type { ScreenProps } from './types';

const ALL_EDGES: NonNullable<ScreenProps['edges']> = ['top', 'bottom', 'left', 'right'];

/**
 * Base structure for a screen: background, safe area, padding, optional header/footer slots,
 * keyboard handling and a loading state. It does not know about any navigation library.
 *
 * @example
 * <Screen header={<Header title="Perfil" left={<BackButton onPress={goBack} />} />}>
 *   <Stack gap="lg">...</Stack>
 * </Screen>
 */
export function Screen({
  background = 'primary',
  padding = 'md',
  edges = ALL_EDGES,
  header,
  footer,
  loading = false,
  loadingMessage,
  keyboardAvoiding = true,
  contentStyle,
  children,
  ...rest
}: ScreenProps) {
  const theme = useTheme();
  const paddingStyle: ViewStyle = { flex: 1, padding: theme.spacing[padding] };

  const body = (
    <>
      {header}
      <View style={[paddingStyle, contentStyle]}>{children}</View>
      {footer}
    </>
  );

  return (
    <ScreenRoot $background={background} edges={edges} {...rest}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {body}
        </KeyboardAvoidingView>
      ) : (
        body
      )}
      <LoadingOverlay visible={loading} message={loadingMessage} />
    </ScreenRoot>
  );
}
