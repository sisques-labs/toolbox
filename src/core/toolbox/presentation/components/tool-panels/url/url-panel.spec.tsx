import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { UrlPanel } from './url-panel';

describe('UrlPanel', () => {
  it('encodes the default plain text input', () => {
    render(<UrlPanel t={enToolbox} onCopy={() => {}} />);
    expect(
      screen.getByText('hello%20world%3Fa%3D1%26b%3D2'),
    ).toBeInTheDocument();
  });

  it('switches to decode mode', () => {
    render(<UrlPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Decode' }));
    fireEvent.change(screen.getByLabelText('URL-encoded text'), {
      target: { value: 'hello%20world' },
    });
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('copies the output', () => {
    const onCopy = vi.fn();
    render(<UrlPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledWith(
      'hello%20world%3Fa%3D1%26b%3D2',
      'Output',
    );
  });
});
