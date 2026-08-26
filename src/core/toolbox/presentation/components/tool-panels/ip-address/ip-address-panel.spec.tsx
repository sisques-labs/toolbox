import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { IpAddressPanel } from './ip-address-panel';

describe('IpAddressPanel', () => {
  it('converts the default address', () => {
    render(<IpAddressPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('3232235777')).toBeInTheDocument();
    expect(screen.getByText('0xC0A80101')).toBeInTheDocument();
    expect(
      screen.getByText('11000000.10101000.00000001.00000001'),
    ).toBeInTheDocument();
  });

  it('recomputes when the address changes', () => {
    render(<IpAddressPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('IPv4 address (e.g. 192.168.1.1)'), {
      target: { value: '0.0.0.0' },
    });
    expect(screen.getByText('0x00000000')).toBeInTheDocument();
  });

  it('shows an error for an invalid address', () => {
    render(<IpAddressPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('IPv4 address (e.g. 192.168.1.1)'), {
      target: { value: 'not an ip' },
    });
    expect(
      screen.getByText('Enter a valid IPv4 address, e.g. 192.168.1.1'),
    ).toBeInTheDocument();
  });

  it('copies the integer value', () => {
    const onCopy = vi.fn();
    render(<IpAddressPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0]);
    expect(onCopy).toHaveBeenCalledWith('3232235777', 'Decimal');
  });
});
