import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { UrlParserPanel } from './url-parser-panel';

describe('UrlParserPanel', () => {
  it('shows the parsed components of the default URL', () => {
    render(<UrlParserPanel t={enToolbox} />);
    expect(screen.getByText('https:')).toBeInTheDocument();
    expect(screen.getByText('example.com')).toBeInTheDocument();
  });

  it('shows an error for an invalid URL', () => {
    render(<UrlParserPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('URL'), {
      target: { value: 'not a url' },
    });
    expect(
      screen.getByText('Enter a valid URL, including the protocol'),
    ).toBeInTheDocument();
  });
});
