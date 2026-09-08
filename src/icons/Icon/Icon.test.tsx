import { renderWithTheme, screen } from '../../test-utils/render';
import { Icon } from './Icon';
import { iconNames, icons } from './icons';

describe('Icon', () => {
  it('defines at least one shape for every icon', () => {
    for (const name of iconNames) {
      expect(icons[name].length).toBeGreaterThan(0);
    }
  });

  it('is decorative by default and labelled when requested', () => {
    renderWithTheme(
      <>
        <Icon name="home" testID="decorative" />
        <Icon name="home" accessibilityLabel="Início" />
      </>,
    );

    expect(screen.getByTestId('decorative', { includeHiddenElements: true }).props.accessible).toBe(
      false,
    );
    expect(screen.getByLabelText('Início')).toBeOnTheScreen();
  });
});
