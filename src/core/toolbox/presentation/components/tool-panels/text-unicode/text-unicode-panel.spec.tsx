import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { TextUnicodePanel } from './text-unicode-panel';

describe('TextUnicodePanel', () => {
  it('converts the default text to code points', () => {
    render(<TextUnicodePanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('text-unicode-output').textContent).toBe(
      'U+0048 U+0069',
    );
  });

  it('converts code points back to text in decode mode', () => {
    render(<TextUnicodePanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Decode' }));
    fireEvent.change(screen.getByLabelText('Unicode code points'), {
      target: { value: 'U+0048 U+0069' },
    });
    expect(screen.getByTestId('text-unicode-output').textContent).toBe('Hi');
  });
});
