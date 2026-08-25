import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders its children as button text', () => {
    render(<Button onClick={() => {}}>Copy</Button>);
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Generate</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('defaults to type="button" so it never submits a surrounding form', () => {
    render(<Button onClick={() => {}}>Copy</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('can be disabled', () => {
    render(
      <Button onClick={() => {}} disabled>
        Copy
      </Button>,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
