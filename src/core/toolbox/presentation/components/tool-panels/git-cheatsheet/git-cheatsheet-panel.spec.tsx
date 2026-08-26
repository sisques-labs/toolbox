import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { GitCheatsheetPanel } from './git-cheatsheet-panel';

describe('GitCheatsheetPanel', () => {
  it('lists results for a search query', () => {
    render(<GitCheatsheetPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Search'), {
      target: { value: 'rebase' },
    });
    expect(screen.getByText('git rebase <branch>')).toBeInTheDocument();
  });

  it('shows a no-matches message for an unknown query', () => {
    render(<GitCheatsheetPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Search'), {
      target: { value: 'not-a-real-git-thing-xyz' },
    });
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });
});
