import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { PasswordStrengthPanel } from './password-strength-panel';

describe('PasswordStrengthPanel', () => {
  it('shows the weak strength badge for a short simple password', () => {
    render(<PasswordStrengthPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: 'abcd' },
    });
    expect(screen.getByText('Weak')).toBeInTheDocument();
    expect(screen.getByText('Instantly')).toBeInTheDocument();
  });

  it('shows the very strong badge for a long mixed-character password', () => {
    render(<PasswordStrengthPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: 'Tr0ub4dor&3-XyZ!qw' },
    });
    expect(screen.getByText('Very strong')).toBeInTheDocument();
  });
});
