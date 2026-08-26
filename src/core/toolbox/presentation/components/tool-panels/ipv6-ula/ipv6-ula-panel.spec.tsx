import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { Ipv6UlaPanel } from './ipv6-ula-panel';

describe('Ipv6UlaPanel', () => {
  it('shows a generated ULA prefix', () => {
    render(<Ipv6UlaPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('ula-value').textContent).toMatch(
      /^fd[0-9a-f]{2}:[0-9a-f]{4}:[0-9a-f]{4}:0000::\/64$/,
    );
  });

  it('regenerates on demand', () => {
    render(<Ipv6UlaPanel t={enToolbox} onCopy={() => {}} />);
    const before = screen.getByTestId('ula-value').textContent;
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    expect(screen.getByTestId('ula-value').textContent).not.toBe(before);
  });
});
