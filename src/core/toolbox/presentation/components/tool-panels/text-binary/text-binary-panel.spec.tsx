import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { TextBinaryPanel } from './text-binary-panel';

describe('TextBinaryPanel', () => {
  it('converts the default text to binary', () => {
    render(<TextBinaryPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('text-binary-output').textContent).toBe(
      '01001000 01101001',
    );
  });

  it('converts binary back to text in decode mode', () => {
    render(<TextBinaryPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Decode' }));
    fireEvent.change(screen.getByLabelText('Binary'), {
      target: { value: '01001000 01101001' },
    });
    expect(screen.getByTestId('text-binary-output').textContent).toBe('Hi');
  });
});
