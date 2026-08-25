import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { RegexPanel } from './regex-panel';

describe('RegexPanel', () => {
  it('lists matches for the default pattern', () => {
    render(<RegexPanel t={enToolbox} />);
    expect(screen.getByText('3 matches')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Toolbox')).toBeInTheDocument();
    expect(screen.getByText('world')).toBeInTheDocument();
  });

  it('shows no matches when nothing hits', () => {
    render(<RegexPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Pattern'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });

  it('shows an error for an invalid pattern', () => {
    render(<RegexPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Pattern'), {
      target: { value: '(' },
    });
    expect(screen.getByText('Invalid regular expression')).toBeInTheDocument();
  });
});
