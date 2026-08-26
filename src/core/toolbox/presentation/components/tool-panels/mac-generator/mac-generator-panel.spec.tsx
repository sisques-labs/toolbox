import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { MacGeneratorPanel } from './mac-generator-panel';

describe('MacGeneratorPanel', () => {
  it('shows a colon-separated MAC address by default', () => {
    render(<MacGeneratorPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('mac-value').textContent).toMatch(
      /^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/,
    );
  });

  it('regenerates a new address when the generate button is clicked', () => {
    render(<MacGeneratorPanel t={enToolbox} onCopy={() => {}} />);
    const before = screen.getByTestId('mac-value').textContent;
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    expect(screen.getByTestId('mac-value').textContent).not.toBe(before);
  });
});
