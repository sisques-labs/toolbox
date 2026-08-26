import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { TextStatsPanel } from './text-stats-panel';

describe('TextStatsPanel', () => {
  it('shows stats for the default input', () => {
    render(<TextStatsPanel t={enToolbox} />);
    expect(screen.getByLabelText('Text to analyze')).toBeInTheDocument();
    expect(screen.getByText('Words')).toBeInTheDocument();
    expect(screen.getByText('Characters')).toBeInTheDocument();
  });

  it('recomputes stats when the input changes', () => {
    render(<TextStatsPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Text to analyze'), {
      target: { value: 'One two three' },
    });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows all-zero stats for empty input', () => {
    render(<TextStatsPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Text to analyze'), {
      target: { value: '' },
    });
    expect(screen.getAllByText('0').length).toBeGreaterThan(0);
  });
});
