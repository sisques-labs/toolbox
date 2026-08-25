import { fireEvent, render, screen } from '@testing-library/react';
import { ToolboxScreen } from './toolbox.screen';

describe('ToolboxScreen', () => {
  it('renders the sidebar, the header for the default tool, and its panel in the default locale', () => {
    render(<ToolboxScreen />);

    expect(
      screen.getByRole('button', { name: /Conversor de mayúsculas/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Conversor de mayúsculas' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Texto de entrada')).toBeInTheDocument();
  });

  it('switches the active tool and header when a sidebar item is clicked', () => {
    render(<ToolboxScreen />);

    fireEvent.click(screen.getByRole('button', { name: /Generador de UUID/ }));

    expect(
      screen.getByRole('heading', { name: 'Generador de UUID' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Cantidad')).toBeInTheDocument();
  });

  it('switches to English copy across the sidebar and header', () => {
    render(<ToolboxScreen />);

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));

    expect(
      screen.getByRole('heading', { name: 'Case converter' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /UUID generator/ }),
    ).toBeInTheDocument();
  });

  it('toggles the dark class on the document root', () => {
    render(<ToolboxScreen />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: /tema oscuro/i }));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('renders in the given initialLocale, for URL-prefixed pages like /en/', () => {
    render(<ToolboxScreen initialLocale="en" />);

    expect(
      screen.getByRole('heading', { name: 'Case converter' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Input text')).toBeInTheDocument();
  });

  it('shows a toast after copying a result', () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn() } });
    render(<ToolboxScreen />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Copiar' })[0]);

    expect(screen.getByText('camelCase copiado')).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'helloWorldExample',
    );
  });
});
