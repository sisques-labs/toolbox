import { fireEvent, render, screen } from '@testing-library/react';
import { ResultRow } from './result-row';

describe('ResultRow', () => {
  it('renders the label and value', () => {
    render(<ResultRow label="MD5" value="abc123" />);
    expect(screen.getByText('MD5')).toBeInTheDocument();
    expect(screen.getByText('abc123')).toBeInTheDocument();
  });

  it('renders without a label', () => {
    render(<ResultRow value="192.168.1.0" />);
    expect(screen.getByText('192.168.1.0')).toBeInTheDocument();
  });

  it('renders a copy button when onCopy is given and calls it when clicked', () => {
    const onCopy = vi.fn();
    render(<ResultRow value="abc123" onCopy={onCopy} copyLabel="Copy" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledOnce();
  });

  it('renders no button when onCopy is omitted', () => {
    render(<ResultRow value="abc123" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
