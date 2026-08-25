import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { YamlPanel } from './yaml-panel';

describe('YamlPanel', () => {
  it('converts the default YAML input to JSON', () => {
    render(<YamlPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByText(/"name": "toolbox"/)).toBeInTheDocument();
  });

  it('switches direction to JSON to YAML', () => {
    render(<YamlPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'JSON → YAML' }));
    fireEvent.change(screen.getByLabelText('JSON input'), {
      target: { value: '{"name":"toolbox"}' },
    });
    expect(screen.getByText('name: toolbox')).toBeInTheDocument();
  });

  it('copies the output', () => {
    const onCopy = vi.fn();
    render(<YamlPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalled();
  });
});
