import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { NatoPanel } from './nato-panel';

describe('NatoPanel', () => {
  it('converts the default input', () => {
    render(<NatoPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('Sierra Oscar Sierra')).toBeInTheDocument();
  });

  it('recomputes when the input changes', () => {
    render(<NatoPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: 'abc' },
    });
    expect(screen.getByText('Alpha Bravo Charlie')).toBeInTheDocument();
  });

  it('copies the output', () => {
    const onCopy = vi.fn();
    render(<NatoPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledWith('Sierra Oscar Sierra', 'NATO');
  });
});
