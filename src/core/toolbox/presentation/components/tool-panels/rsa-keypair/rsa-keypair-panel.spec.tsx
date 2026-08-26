import { render, screen, waitFor } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { RsaKeypairPanel } from './rsa-keypair-panel';

describe('RsaKeypairPanel', () => {
  it('generates a PEM public and private key on mount', async () => {
    render(<RsaKeypairPanel t={enToolbox} onCopy={() => {}} />);

    await waitFor(
      () =>
        expect(screen.getByTestId('rsa-public-key').textContent).toContain(
          'BEGIN PUBLIC KEY',
        ),
      { timeout: 10000 },
    );
    expect(screen.getByTestId('rsa-private-key').textContent).toContain(
      'BEGIN PRIVATE KEY',
    );
  }, 15000);
});
