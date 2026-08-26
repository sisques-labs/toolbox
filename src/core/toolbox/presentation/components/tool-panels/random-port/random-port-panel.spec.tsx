import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { RandomPortPanel } from './random-port-panel';

describe('RandomPortPanel', () => {
  it('shows a generated port on mount', () => {
    render(<RandomPortPanel t={enToolbox} onCopy={() => {}} />);
    const value = Number(screen.getByTestId('random-port-value').textContent);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(1023);
  });

  it('regenerates within the dynamic range when selected', () => {
    render(<RandomPortPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Range'), {
      target: { value: 'dynamic' },
    });
    const value = Number(screen.getByTestId('random-port-value').textContent);
    expect(value).toBeGreaterThanOrEqual(49152);
  });
});
