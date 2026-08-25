import { fireEvent, render, screen } from '@testing-library/react';
import { HomeScreen } from './home.screen';

describe('HomeScreen', () => {
  it('renders the shell heading and the empty tools state in the default locale', () => {
    render(<HomeScreen />);
    expect(
      screen.getByRole('heading', { name: 'Toolbox' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Todavía no hay herramientas publicadas aquí. Vuelve pronto.',
      ),
    ).toBeInTheDocument();
  });

  it('switches the tools section copy to English', () => {
    render(<HomeScreen />);
    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(
      screen.getByText('No tools published here yet. Check back soon.'),
    ).toBeInTheDocument();
  });

  it('toggles the dark class on the document root', () => {
    render(<HomeScreen />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: /tema oscuro/i }));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
