import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { MacLookupPanel } from './mac-lookup-panel';

describe('MacLookupPanel', () => {
  it('shows the vendor for a known MAC prefix', () => {
    render(<MacLookupPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('MAC address'), {
      target: { value: 'F0:EE:7A:11:22:33' },
    });
    expect(screen.getByText('Apple, Inc.')).toBeInTheDocument();
  });

  it('shows a not-found message for an unknown prefix', () => {
    render(<MacLookupPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('MAC address'), {
      target: { value: '00:00:00:11:22:33' },
    });
    expect(
      screen.getByText('No vendor found for this prefix'),
    ).toBeInTheDocument();
  });

  it('shows an error for a malformed address', () => {
    render(<MacLookupPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('MAC address'), {
      target: { value: 'garbage' },
    });
    expect(
      screen.getByText('Enter a valid MAC address, e.g. 00:1A:2B:3C:4D:5E'),
    ).toBeInTheDocument();
  });
});
