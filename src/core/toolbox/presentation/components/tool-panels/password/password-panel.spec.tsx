import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { PasswordPanel } from './password-panel';

describe('PasswordPanel', () => {
  it('generates a 16-character password by default', () => {
    render(<PasswordPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('password-value')).toHaveTextContent(/^.{16}$/);
  });

  it('regenerates a password of the requested length', () => {
    render(<PasswordPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Length'), {
      target: { value: '24' },
    });
    expect(screen.getByTestId('password-value')).toHaveTextContent(/^.{24}$/);
  });

  it('regenerates when a character-set checkbox is toggled', () => {
    render(<PasswordPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByLabelText('Symbols'));
    expect(screen.getByTestId('password-value').textContent).not.toMatch(
      /[!@#$%^&*()\-_=+[\]{}]/,
    );
  });

  it('copies the current password', () => {
    const onCopy = vi.fn();
    render(<PasswordPanel t={enToolbox} onCopy={onCopy} />);
    const value = screen.getByTestId('password-value').textContent ?? '';
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledWith(value, 'Password');
  });
});
