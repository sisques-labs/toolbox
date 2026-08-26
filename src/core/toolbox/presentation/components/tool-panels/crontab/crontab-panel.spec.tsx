import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { CrontabPanel } from './crontab-panel';

describe('CrontabPanel', () => {
  it('shows the default daily expression', () => {
    render(<CrontabPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('0 9 * * *')).toBeInTheDocument();
    expect(screen.getByText('At 09:00 every day')).toBeInTheDocument();
  });

  it('updates when a field changes', () => {
    render(<CrontabPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Minute'), {
      target: { value: '15' },
    });
    expect(screen.getByText('15 9 * * *')).toBeInTheDocument();
  });

  it('copies the expression', () => {
    const onCopy = vi.fn();
    render(<CrontabPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0]);
    expect(onCopy).toHaveBeenCalledWith('0 9 * * *', 'Expression');
  });
});
