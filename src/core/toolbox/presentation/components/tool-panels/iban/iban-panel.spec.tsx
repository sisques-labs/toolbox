import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { IbanPanel } from './iban-panel';

describe('IbanPanel', () => {
  it('parses and validates the default IBAN', () => {
    render(<IbanPanel t={enToolbox} />);
    expect(screen.getByText('GB29 NWBK 6016 1331 9268 19')).toBeInTheDocument();
    expect(screen.getByText('Valid')).toBeInTheDocument();
  });

  it('flags an invalid checksum', () => {
    render(<IbanPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('IBAN'), {
      target: { value: 'GB29 NWBK 6016 1331 9268 18' },
    });
    expect(screen.getByText('Invalid checksum')).toBeInTheDocument();
  });

  it('shows an error for a malformed IBAN', () => {
    render(<IbanPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('IBAN'), {
      target: { value: 'not an iban' },
    });
    expect(
      screen.getByText('Enter a valid IBAN, e.g. GB29 NWBK 6016 1331 9268 19'),
    ).toBeInTheDocument();
  });
});
