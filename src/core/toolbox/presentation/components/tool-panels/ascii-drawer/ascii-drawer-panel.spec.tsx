import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { AsciiDrawerPanel } from './ascii-drawer-panel';

describe('AsciiDrawerPanel', () => {
  it('draws a banner for the default text', () => {
    render(<AsciiDrawerPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('ascii-output').textContent).toContain('#');
  });

  it('redraws as the input changes', () => {
    render(<AsciiDrawerPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: 'HI' },
    });
    expect(screen.getByTestId('ascii-output').textContent).toContain('#.# ###');
  });
});
