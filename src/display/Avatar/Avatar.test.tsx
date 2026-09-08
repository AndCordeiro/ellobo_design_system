import { renderWithTheme, screen } from '../../test-utils/render';
import { Avatar, getInitials } from './Avatar';

describe('Avatar', () => {
  it('derives initials from the name', () => {
    expect(getInitials('André Cordeiro')).toBe('AC');
    expect(getInitials('Maria')).toBe('M');
    expect(getInitials('  ')).toBe('');
  });

  it('renders initials when there is no image', () => {
    renderWithTheme(<Avatar name="André Cordeiro" />);
    expect(screen.getByText('AC')).toBeOnTheScreen();
    expect(screen.getByLabelText('André Cordeiro')).toBeOnTheScreen();
  });

  it('prefers the explicit fallback', () => {
    renderWithTheme(<Avatar name="André Cordeiro" fallback="EL" />);
    expect(screen.getByText('EL')).toBeOnTheScreen();
  });
});
