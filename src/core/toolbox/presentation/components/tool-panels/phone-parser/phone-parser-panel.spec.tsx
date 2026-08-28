import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { PhoneParserPanel } from './phone-parser-panel';

describe('PhoneParserPanel', () => {
  it('parses the default phone number', () => {
    render(<PhoneParserPanel t={enToolbox} />);
    expect(screen.getByText('Spain')).toBeInTheDocument();
  });

  it('shows an error for an invalid number', () => {
    render(<PhoneParserPanel t={enToolbox} />);
    fireEvent.change(
      screen.getByLabelText('Phone number (with country code)'),
      {
        target: { value: 'not a phone number' },
      },
    );
    expect(
      screen.getByText(
        'Enter a number starting with + and a recognized dial code',
      ),
    ).toBeInTheDocument();
  });
});
