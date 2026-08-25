import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageSwitcher } from './language-switcher';

describe('LanguageSwitcher', () => {
  it('renders one button per option and marks the active locale', () => {
    render(
      <LanguageSwitcher locale="es" onChange={() => {}} label="Language" />,
    );
    expect(screen.getByRole('button', { name: 'ES' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('calls onChange with the clicked locale', () => {
    const onChange = vi.fn();
    render(
      <LanguageSwitcher locale="es" onChange={onChange} label="Language" />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(onChange).toHaveBeenCalledWith('en');
  });

  it('exposes the group under the given accessible label', () => {
    render(<LanguageSwitcher locale="es" onChange={() => {}} label="Idioma" />);
    expect(screen.getByRole('group', { name: 'Idioma' })).toBeInTheDocument();
  });
});
