import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { SlugPanel } from './slug-panel';

describe('SlugPanel', () => {
  it('slugifies the default input', () => {
    render(<SlugPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('hello-world-example')).toBeInTheDocument();
  });

  it('recomputes the slug when the input changes', () => {
    render(<SlugPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: 'Foo Bar!' },
    });
    expect(screen.getByText('foo-bar')).toBeInTheDocument();
  });

  it('copies the slug', () => {
    const onCopy = vi.fn();
    render(<SlugPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledWith('hello-world-example', 'Slug');
  });
});
