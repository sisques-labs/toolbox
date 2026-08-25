import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { HashPanel } from './hash-panel';

describe('HashPanel', () => {
  it('computes hashes for the default input', async () => {
    render(<HashPanel t={enToolbox} onCopy={() => {}} />);
    expect(
      await screen.findByText('867748323b222a2e63666df4061a041b'),
    ).toBeInTheDocument();
  });

  it('recomputes hashes when the input changes', async () => {
    render(<HashPanel t={enToolbox} onCopy={() => {}} />);
    await screen.findByText('867748323b222a2e63666df4061a041b');

    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: '' },
    });

    expect(
      await screen.findByText('d41d8cd98f00b204e9800998ecf8427e'),
    ).toBeInTheDocument();
  });

  it('copies a hash row', async () => {
    const onCopy = vi.fn();
    render(<HashPanel t={enToolbox} onCopy={onCopy} />);
    await screen.findByText('867748323b222a2e63666df4061a041b');

    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0]);

    expect(onCopy).toHaveBeenCalledWith(
      '867748323b222a2e63666df4061a041b',
      'MD5',
    );
  });
});
