import { fireEvent, render, screen, within } from '@testing-library/react';
import { ToolboxScreen } from './toolbox.screen';

describe('ToolboxScreen', () => {
  it('renders the sidebar and a home view with every tool as a card by default', () => {
    render(<ToolboxScreen />);

    expect(
      screen.getByRole('heading', { name: 'Toolbox' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Una colección de pequeñas utilidades web de Sisques Labs.',
      ),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('main')).getByRole('button', {
        name: /Conversor de mayúsculas/,
      }),
    ).toBeInTheDocument();
  });

  it('opens a tool and shows its header/panel when a sidebar item is clicked', () => {
    render(<ToolboxScreen />);

    fireEvent.click(
      within(screen.getByRole('navigation')).getByRole('button', {
        name: /Generador de UUID/,
      }),
    );

    expect(
      screen.getByRole('heading', { name: 'Generador de UUID' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Cantidad')).toBeInTheDocument();
  });

  it('opens a tool when its home card is clicked', () => {
    render(<ToolboxScreen />);

    fireEvent.click(
      within(screen.getByRole('main')).getByRole('button', {
        name: /Generador de UUID/,
      }),
    );

    expect(
      screen.getByRole('heading', { name: 'Generador de UUID' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Cantidad')).toBeInTheDocument();
  });

  it('returns to the home view when the brand is clicked', () => {
    render(<ToolboxScreen />);
    fireEvent.click(
      within(screen.getByRole('navigation')).getByRole('button', {
        name: /Generador de UUID/,
      }),
    );
    expect(
      screen.getByRole('heading', { name: 'Generador de UUID' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Toolbox' }));

    expect(
      screen.getByRole('heading', { name: 'Toolbox' }),
    ).toBeInTheDocument();
  });

  it('switches to English copy across the sidebar and header', () => {
    render(<ToolboxScreen />);

    fireEvent.click(
      within(screen.getByRole('navigation')).getByRole('button', {
        name: /Generador de UUID/,
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'EN' }));

    expect(
      screen.getByRole('heading', { name: 'UUID generator' }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('navigation')).getByRole('button', {
        name: /Case converter/,
      }),
    ).toBeInTheDocument();
  });

  it('toggles the dark class on the document root', () => {
    render(<ToolboxScreen />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: /tema oscuro/i }));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('renders the home view in the given initialLocale, for URL-prefixed pages like /en/', () => {
    render(<ToolboxScreen initialLocale="en" />);

    expect(
      screen.getByRole('heading', { name: 'Toolbox' }),
    ).toBeInTheDocument();
    fireEvent.click(
      within(screen.getByRole('navigation')).getByRole('button', {
        name: /Case converter/,
      }),
    );
    expect(screen.getByLabelText('Input text')).toBeInTheDocument();
  });

  it('shows a toast after copying a result', () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn() } });
    render(<ToolboxScreen />);
    fireEvent.click(
      within(screen.getByRole('navigation')).getByRole('button', {
        name: /Conversor de mayúsculas/,
      }),
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Copiar' })[0]);

    expect(screen.getByText('camelCase copiado')).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'helloWorldExample',
    );
  });
});
