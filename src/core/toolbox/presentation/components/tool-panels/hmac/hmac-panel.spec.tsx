import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { HmacPanel } from './hmac-panel';

describe('HmacPanel', () => {
  it('computes the HMAC-SHA256 digest for the default message and secret', async () => {
    render(<HmacPanel t={enToolbox} onCopy={() => {}} />);
    await waitFor(() =>
      expect(screen.getByTestId('hmac-result').textContent).not.toBe(''),
    );
    expect(screen.getByTestId('hmac-result').textContent).toMatch(
      /^[0-9a-f]{64}$/,
    );
  });

  it('recomputes when the secret changes', async () => {
    render(<HmacPanel t={enToolbox} onCopy={() => {}} />);
    await waitFor(() =>
      expect(screen.getByTestId('hmac-result').textContent).not.toBe(''),
    );
    const before = screen.getByTestId('hmac-result').textContent;

    fireEvent.change(screen.getByLabelText('Secret key'), {
      target: { value: 'a-different-secret' },
    });

    await waitFor(() =>
      expect(screen.getByTestId('hmac-result').textContent).not.toBe(before),
    );
  });
});
