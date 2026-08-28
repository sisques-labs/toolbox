import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { TemperaturePanel } from './temperature-panel';

describe('TemperaturePanel', () => {
  it('converts the default 0°C to fahrenheit and kelvin', () => {
    render(<TemperaturePanel t={enToolbox} />);
    expect(screen.getByText('32')).toBeInTheDocument();
    expect(screen.getByText('273.15')).toBeInTheDocument();
  });

  it('converts from fahrenheit when the unit changes', () => {
    render(<TemperaturePanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Unit'), {
      target: { value: 'fahrenheit' },
    });
    fireEvent.change(screen.getByLabelText('Temperature'), {
      target: { value: '98.6' },
    });
    expect(screen.getByText('37')).toBeInTheDocument();
  });
});
