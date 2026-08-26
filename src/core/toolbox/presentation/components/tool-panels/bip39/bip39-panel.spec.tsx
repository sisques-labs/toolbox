import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { Bip39Panel } from './bip39-panel';

describe('Bip39Panel', () => {
  it('generates a 12-word mnemonic by default', async () => {
    render(<Bip39Panel t={enToolbox} onCopy={() => {}} />);
    await waitFor(() =>
      expect(
        screen.getByTestId('bip39-mnemonic').textContent!.split(' '),
      ).toHaveLength(12),
    );
  });

  it('validates a pasted mnemonic as valid', async () => {
    render(<Bip39Panel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Mnemonic to validate'), {
      target: {
        value:
          'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
      },
    });
    await waitFor(() => expect(screen.getByText('Valid')).toBeInTheDocument());
  });

  it('flags a made-up mnemonic as invalid', async () => {
    render(<Bip39Panel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Mnemonic to validate'), {
      target: { value: 'not a real mnemonic phrase at all here today' },
    });
    await waitFor(() =>
      expect(screen.getByText('Invalid')).toBeInTheDocument(),
    );
  });
});
