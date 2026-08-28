import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { HttpStatusPanel } from './http-status-panel';

describe('HttpStatusPanel', () => {
  it('lists every status code by default', () => {
    render(<HttpStatusPanel t={enToolbox} />);
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('filters the list as the user types a query', () => {
    render(<HttpStatusPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Search by code or phrase'), {
      target: { value: '404' },
    });
    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.queryByText('Continue')).not.toBeInTheDocument();
  });

  it('shows a no-matches message when nothing matches', () => {
    render(<HttpStatusPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Search by code or phrase'), {
      target: { value: 'nonexistent-status' },
    });
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });
});
