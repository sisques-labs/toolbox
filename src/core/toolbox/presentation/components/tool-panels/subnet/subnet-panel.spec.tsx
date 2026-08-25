import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { SubnetPanel } from './subnet-panel';

describe('SubnetPanel', () => {
  it('calculates the default CIDR', () => {
    render(<SubnetPanel t={enToolbox} />);
    expect(screen.getByText('192.168.1.255')).toBeInTheDocument();
    expect(screen.getByText('254')).toBeInTheDocument();
  });

  it('shows an error message for an invalid CIDR', () => {
    render(<SubnetPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('CIDR (e.g. 192.168.1.0/24)'), {
      target: { value: 'not a cidr' },
    });
    expect(
      screen.getByText('Enter a valid CIDR, e.g. 10.0.0.0/16'),
    ).toBeInTheDocument();
  });
});
