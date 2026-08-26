import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { PercentagePanel } from './percentage-panel';

describe('PercentagePanel', () => {
  it('computes X% of Y', () => {
    render(<PercentagePanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Percent'), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '200' },
    });
    expect(screen.getByTestId('percent-of-result').textContent).toBe('50');
  });

  it('computes what percent X is of Y', () => {
    render(<PercentagePanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('Part'), {
      target: { value: '50' },
    });
    fireEvent.change(screen.getByLabelText('Whole'), {
      target: { value: '200' },
    });
    expect(screen.getByTestId('what-percent-result').textContent).toBe('25');
  });

  it('computes the percentage change from X to Y', () => {
    render(<PercentagePanel t={enToolbox} />);
    fireEvent.change(screen.getByLabelText('From'), {
      target: { value: '200' },
    });
    fireEvent.change(screen.getByLabelText('To'), {
      target: { value: '250' },
    });
    expect(screen.getByTestId('percent-change-result').textContent).toBe('25');
  });
});
