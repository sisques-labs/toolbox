import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { CasePanel } from './case-panel';

describe('CasePanel', () => {
  it('converts the default input into every case', () => {
    render(<CasePanel t={enToolbox} onCopy={() => {}} />);

    expect(screen.getByText('helloWorldExample')).toBeInTheDocument();
    expect(screen.getByText('HelloWorldExample')).toBeInTheDocument();
    expect(screen.getByText('hello_world_example')).toBeInTheDocument();
    expect(screen.getByText('hello-world-example')).toBeInTheDocument();
  });

  it('recomputes every case when the input changes', () => {
    render(<CasePanel t={enToolbox} onCopy={() => {}} />);

    fireEvent.change(screen.getByLabelText('Input text'), {
      target: { value: 'foo bar' },
    });

    expect(screen.getByText('fooBar')).toBeInTheDocument();
    expect(screen.getByText('foo_bar')).toBeInTheDocument();
  });

  it('copies the clicked row value', () => {
    const onCopy = vi.fn();
    render(<CasePanel t={enToolbox} onCopy={onCopy} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0]);

    expect(onCopy).toHaveBeenCalledWith('helloWorldExample', 'camelCase');
  });
});
