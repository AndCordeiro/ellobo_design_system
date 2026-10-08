import { Text } from 'react-native';
import { renderWithTheme, screen } from '../../test-utils/render';
import { ScrollScreen } from './ScrollScreen';

const mockInsets = { top: 24, right: 0, bottom: 34, left: 0 };

jest.mock('react-native-safe-area-context', () => {
  const mock = jest.requireActual('react-native-safe-area-context/jest/mock');
  const actual = mock.default ?? mock;
  return { ...actual, useSafeAreaInsets: () => mockInsets };
});

// The keyboard mock renders KeyboardStickyView as a plain View, so its props can be read back.
interface IRenderedNode {
  type: unknown;
  props: { offset?: { closed: number; opened: number } };
}

function stickyOffset() {
  const nodes = screen.UNSAFE_root.findAll(
    (node: IRenderedNode) => typeof node.type !== 'string' && node.props.offset !== undefined,
  ) as IRenderedNode[];
  return nodes[0]?.props.offset;
}

describe('ScrollScreen footer and the keyboard', () => {
  it('sits right on the keyboard: the bottom inset the screen keeps clear is not added on top of it', () => {
    renderWithTheme(
      <ScrollScreen footer={<Text>Salvar</Text>}>
        <Text>Campos</Text>
      </ScrollScreen>,
    );

    // The keyboard height is measured from the screen edge, which already includes the inset.
    expect(stickyOffset()).toEqual({ closed: 0, opened: mockInsets.bottom });
  });

  it('needs no correction when the screen does not keep the bottom inset', () => {
    renderWithTheme(
      <ScrollScreen edges={['top']} footer={<Text>Salvar</Text>}>
        <Text>Campos</Text>
      </ScrollScreen>,
    );

    expect(stickyOffset()).toEqual({ closed: 0, opened: 0 });
  });
});
