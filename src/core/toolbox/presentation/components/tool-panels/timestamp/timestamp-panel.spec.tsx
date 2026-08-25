import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { TimestampPanel } from './timestamp-panel';

describe('TimestampPanel', () => {
  it('converts a Unix timestamp to ISO and UTC', () => {
    render(<TimestampPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Unix timestamp (seconds)'), {
      target: { value: String(Date.UTC(2024, 0, 15, 12, 30) / 1000) },
    });
    expect(screen.getByText('2024-01-15T12:30:00.000Z')).toBeInTheDocument();
  });

  it('sets the current time when Now is clicked', () => {
    render(<TimestampPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Now' }));
    const displayed = Number(
      screen.getByLabelText('Unix timestamp (seconds)').getAttribute('value'),
    );
    expect(Math.abs(displayed - Math.floor(Date.now() / 1000))).toBeLessThan(5);
  });

  it('copies the ISO row', () => {
    const onCopy = vi.fn();
    render(<TimestampPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0]);
    expect(onCopy).toHaveBeenCalledWith(expect.any(String), 'ISO 8601');
  });
});
