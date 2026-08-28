import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { IpRangePanel } from './ip-range-panel';

describe('IpRangePanel', () => {
  it('lists the addresses for the default CIDR', () => {
    render(<IpRangePanel t={enToolbox} />);
    expect(screen.getByTestId('ip-range-list').textContent).toContain(
      '192.168.1.0',
    );
    expect(screen.getByTestId('ip-range-list').textContent).toContain(
      '192.168.1.3',
    );
  });

  it('shows an error for an invalid CIDR', () => {
    render(<IpRangePanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('CIDR (e.g. 192.168.1.0/24)'), {
      target: { value: 'garbage' },
    });
    expect(
      screen.getByText('Enter a valid CIDR, e.g. 10.0.0.0/16'),
    ).toBeInTheDocument();
  });
});
