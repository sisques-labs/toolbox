import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { RegexCheatsheetPanel } from './regex-cheatsheet-panel';

describe('RegexCheatsheetPanel', () => {
  it('lists results for a search query', () => {
    render(<RegexCheatsheetPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Search'), {
      target: { value: 'digit' },
    });
    expect(screen.getByText('Any digit (0-9)')).toBeInTheDocument();
  });

  it('shows a no-matches message for an unknown query', () => {
    render(<RegexCheatsheetPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Search'), {
      target: { value: 'not-a-real-regex-token-xyz' },
    });
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });
});
