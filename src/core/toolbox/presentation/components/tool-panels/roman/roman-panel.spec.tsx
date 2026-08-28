import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { RomanPanel } from './roman-panel';

describe('RomanPanel', () => {
  it('converts the default arabic input to roman', () => {
    render(<RomanPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('MCMXCIV')).toBeInTheDocument();
  });

  it('converts a roman numeral back to arabic', () => {
    render(<RomanPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: 'XLII' },
    });
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('shows an error for invalid input', () => {
    render(<RomanPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: 'IIII' },
    });
    expect(
      screen.getByText(
        'Enter a number from 1 to 3999 or a valid roman numeral',
      ),
    ).toBeInTheDocument();
  });
});
