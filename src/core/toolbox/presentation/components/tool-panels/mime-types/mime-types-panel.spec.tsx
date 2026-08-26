import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { MimeTypesPanel } from './mime-types-panel';

describe('MimeTypesPanel', () => {
  it('lists results for a search query', () => {
    render(<MimeTypesPanel t={enToolbox} />);
    fireEvent.change(
      screen.getByLabelText('Search by extension or MIME type'),
      { target: { value: 'json' } },
    );
    expect(screen.getByText('application/json')).toBeInTheDocument();
  });

  it('shows a no-matches message for an unknown query', () => {
    render(<MimeTypesPanel t={enToolbox} />);
    fireEvent.change(
      screen.getByLabelText('Search by extension or MIME type'),
      { target: { value: 'not-a-real-type-xyz' } },
    );
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });
});
