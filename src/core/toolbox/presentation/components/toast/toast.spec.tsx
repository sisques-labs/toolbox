import { render, screen } from '@testing-library/react';
import { Toast } from './toast';

describe('Toast', () => {
  it('renders the given text', () => {
    render(<Toast text="Slug copied" />);
    expect(screen.getByText('Slug copied')).toBeInTheDocument();
  });

  it('is visually hidden when there is no text', () => {
    render(<Toast text="" />);
    const toast = screen.getByTestId('toast');
    expect(toast).toHaveClass('opacity-0');
  });

  it('is visible when there is text', () => {
    render(<Toast text="UUID copied" />);
    const toast = screen.getByTestId('toast');
    expect(toast).toHaveClass('opacity-100');
  });
});
