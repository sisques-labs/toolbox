import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { TotpPanel } from './totp-panel';

describe('TotpPanel', () => {
  it('shows a 6-digit code for the default secret', async () => {
    render(<TotpPanel t={enToolbox} onCopy={() => {}} />);
    await waitFor(() => {
      expect(screen.getByText(/^\d{6}$/)).toBeInTheDocument();
    });
  });

  it('shows an error for an invalid secret', async () => {
    render(<TotpPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Base32 secret'), {
      target: { value: '!!!' },
    });
    await waitFor(() => {
      expect(
        screen.getByText('Enter a valid Base32 secret'),
      ).toBeInTheDocument();
    });
  });

  it('copies the current code', async () => {
    const onCopy = vi.fn();
    render(<TotpPanel t={enToolbox} onCopy={onCopy} />);
    await waitFor(() => {
      expect(screen.getByText(/^\d{6}$/)).toBeInTheDocument();
    });
    const code = screen.getByText(/^\d{6}$/).textContent ?? '';
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledWith(code, 'TOTP');
  });
});
