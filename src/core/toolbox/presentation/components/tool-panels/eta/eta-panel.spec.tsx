import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { EtaPanel } from './eta-panel';

describe('EtaPanel', () => {
  it('shows the remaining time for the default inputs', () => {
    render(<EtaPanel t={enToolbox} />);
    expect(screen.getByTestId('eta-result').textContent).not.toBe('');
  });

  it('recomputes when the inputs change', () => {
    render(<EtaPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Units completed'), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByLabelText('Total units'), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText('Elapsed time (seconds)'), {
      target: { value: '50' },
    });
    expect(screen.getByTestId('eta-result').textContent).toBe('3 min');
  });

  it('shows an error for non-positive inputs', () => {
    render(<EtaPanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Units completed'), {
      target: { value: '0' },
    });
    expect(
      screen.getByText(
        'Enter positive values for completed units, total units and elapsed time',
      ),
    ).toBeInTheDocument();
  });
});
