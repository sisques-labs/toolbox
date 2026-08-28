import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { ColorPanel } from './color-panel';

describe('ColorPanel', () => {
  it('converts the default hex input', () => {
    render(<ColorPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('#336699')).toBeInTheDocument();
    expect(screen.getByText('rgb(51, 102, 153)')).toBeInTheDocument();
    expect(screen.getByText('hsl(210, 50%, 40%)')).toBeInTheDocument();
  });

  it('shows an error for invalid input', () => {
    render(<ColorPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Color'), {
      target: { value: 'nope' },
    });
    expect(
      screen.getByText('Enter a valid color (hex, rgb or hsl)'),
    ).toBeInTheDocument();
  });

  it('copies the hex value', () => {
    const onCopy = vi.fn();
    render(<ColorPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0]);
    expect(onCopy).toHaveBeenCalledWith('#336699', 'HEX');
  });
});
