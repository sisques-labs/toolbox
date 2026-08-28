import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { BcryptPanel } from './bcrypt-panel';

describe('BcryptPanel', () => {
  it('generates a bcrypt hash for the default text', () => {
    render(<BcryptPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('bcrypt-hash').textContent).toMatch(
      /^\$2[aby]\$\d{2}\$/,
    );
  });

  it('reports a match when verifying the correct text against the hash', () => {
    render(<BcryptPanel t={enToolbox} onCopy={() => {}} />);
    const hash = screen.getByTestId('bcrypt-hash').textContent!;

    fireEvent.change(screen.getByLabelText('Hash to verify'), {
      target: { value: hash },
    });
    fireEvent.change(screen.getByLabelText('Plain text to verify'), {
      target: { value: 'password123' },
    });

    expect(screen.getByText('Match')).toBeInTheDocument();
  });

  it('reports no match for the wrong text', () => {
    render(<BcryptPanel t={enToolbox} onCopy={() => {}} />);
    const hash = screen.getByTestId('bcrypt-hash').textContent!;

    fireEvent.change(screen.getByLabelText('Hash to verify'), {
      target: { value: hash },
    });
    fireEvent.change(screen.getByLabelText('Plain text to verify'), {
      target: { value: 'wrong' },
    });

    expect(screen.getByText('No match')).toBeInTheDocument();
  });
});
