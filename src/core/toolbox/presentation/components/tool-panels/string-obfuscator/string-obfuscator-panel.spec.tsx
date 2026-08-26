import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { StringObfuscatorPanel } from './string-obfuscator-panel';

describe('StringObfuscatorPanel', () => {
  it('masks the default text', () => {
    render(<StringObfuscatorPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('obfuscator-output').textContent).toBe(
      '4242********4242',
    );
  });

  it('re-masks as the visible-start count changes', () => {
    render(<StringObfuscatorPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Visible at start'), {
      target: { value: '2' },
    });
    expect(screen.getByTestId('obfuscator-output').textContent).toBe(
      '42**********4242',
    );
  });
});
