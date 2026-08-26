import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { SafelinkPanel } from './safelink-panel';

describe('SafelinkPanel', () => {
  it('decodes the default wrapped link', () => {
    render(<SafelinkPanel t={enToolbox} onCopy={() => {}} />);
    expect(
      screen.getByText('https://example.com/path?a=1'),
    ).toBeInTheDocument();
  });

  it('shows an error for a link with no wrapper parameter', () => {
    render(<SafelinkPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Wrapped link'), {
      target: { value: 'https://example.com' },
    });
    expect(
      screen.getByText('Enter a valid Outlook or Google redirect link'),
    ).toBeInTheDocument();
  });
});
