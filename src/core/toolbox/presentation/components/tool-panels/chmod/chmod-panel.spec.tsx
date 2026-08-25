import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { ChmodPanel } from './chmod-panel';

describe('ChmodPanel', () => {
  it('shows default 755 permissions', () => {
    render(<ChmodPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText('755')).toBeInTheDocument();
    expect(screen.getByText('rwxr-xr--')).toBeInTheDocument();
  });

  it('updates flags when octal changes', () => {
    render(<ChmodPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('Octal'), {
      target: { value: '644' },
    });
    expect(screen.getByText('rw-r--r--')).toBeInTheDocument();
  });

  it('copies the octal value', () => {
    const onCopy = vi.fn();
    render(<ChmodPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0]);
    expect(onCopy).toHaveBeenCalledWith('755', 'Octal');
  });
});
