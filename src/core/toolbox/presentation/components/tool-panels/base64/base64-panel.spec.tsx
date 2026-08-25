import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { Base64Panel } from './base64-panel';

describe('Base64Panel', () => {
  it('encodes the default plain text input', () => {
    render(<Base64Panel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText(btoa('Hello, Toolbox!'))).toBeInTheDocument();
  });

  it('switches to decode mode', () => {
    render(<Base64Panel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Decode' }));
    fireEvent.change(screen.getByLabelText('Base64 text'), {
      target: { value: btoa('hi there') },
    });
    expect(screen.getByText('hi there')).toBeInTheDocument();
  });

  it('copies the output', () => {
    const onCopy = vi.fn();
    render(<Base64Panel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledWith(btoa('Hello, Toolbox!'), 'Output');
  });
});
