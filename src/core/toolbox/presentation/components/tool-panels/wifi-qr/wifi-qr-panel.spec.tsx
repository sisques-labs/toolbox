import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { WifiQrPanel } from './wifi-qr-panel';

describe('WifiQrPanel', () => {
  it('renders a QR preview for the default network', () => {
    render(<WifiQrPanel t={enToolbox} />);
    expect(screen.getByTestId('wifi-qr-preview').innerHTML).toContain('<svg');
  });

  it('shows an error when the SSID is cleared', () => {
    render(<WifiQrPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Network name (SSID)'), {
      target: { value: '' },
    });
    expect(screen.getByText('Enter a network name (SSID)')).toBeInTheDocument();
  });
});
