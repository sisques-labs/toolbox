import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { QrPanel } from './qr-panel';

describe('QrPanel', () => {
  it('renders a QR SVG for the default URL', () => {
    render(<QrPanel t={enToolbox} />);
    const preview = screen.getByTestId('qr-preview');
    expect(preview.querySelector('svg')).toBeInTheDocument();
  });

  it('shows an error when content is empty', () => {
    render(<QrPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Content'), {
      target: { value: '   ' },
    });
    expect(
      screen.getByText('Enter text or a URL to encode'),
    ).toBeInTheDocument();
  });
});
