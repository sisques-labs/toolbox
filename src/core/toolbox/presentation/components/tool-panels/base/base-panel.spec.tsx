import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { BasePanel } from './base-panel';

describe('BasePanel', () => {
  it('converts the default decimal input', () => {
    render(<BasePanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('255')).toBeInTheDocument();
    expect(screen.getByText('11111111')).toBeInTheDocument();
    expect(screen.getByText('377')).toBeInTheDocument();
    expect(screen.getByText('FF')).toBeInTheDocument();
  });

  it('shows an error for invalid input', () => {
    render(<BasePanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Number'), {
      target: { value: 'xyz' },
    });
    expect(
      screen.getByText('Enter a valid number for the selected base'),
    ).toBeInTheDocument();
  });
});
