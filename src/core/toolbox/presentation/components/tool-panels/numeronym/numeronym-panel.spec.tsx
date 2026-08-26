import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { NumeronymPanel } from './numeronym-panel';

describe('NumeronymPanel', () => {
  it('numeronymizes the default input', () => {
    render(<NumeronymPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('i18n')).toBeInTheDocument();
  });

  it('recomputes the numeronym when the input changes', () => {
    render(<NumeronymPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: 'accessibility' },
    });
    expect(screen.getByText('a11y')).toBeInTheDocument();
  });

  it('copies the numeronym', () => {
    const onCopy = vi.fn();
    render(<NumeronymPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledWith('i18n', 'Numeronym');
  });
});
