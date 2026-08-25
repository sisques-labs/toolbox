import { render, screen } from '@testing-library/react';
import { Providers } from '@/shared/presentation/providers/providers';
import { AppShell } from './app-shell';

function renderShell(children: React.ReactNode = null) {
  return render(
    <Providers>
      <AppShell>{children}</AppShell>
    </Providers>,
  );
}

describe('AppShell', () => {
  it('renders the shell heading, tagline and controls', () => {
    renderShell();
    expect(
      screen.getByRole('heading', { name: 'Toolbox' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Una colección de pequeñas utilidades web de Sisques Labs.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Idioma' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cambiar a tema oscuro' }),
    ).toBeInTheDocument();
  });

  it('renders its children below the header', () => {
    renderShell(<p>tool content</p>);
    expect(screen.getByText('tool content')).toBeInTheDocument();
  });
});
