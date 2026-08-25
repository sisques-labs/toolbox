import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { JsonPanel } from './json-panel';

describe('JsonPanel', () => {
  it('formats the default JSON input with a 2-space indent', () => {
    render(<JsonPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('json-output')).toHaveTextContent(
      '"name": "toolbox"',
    );
  });

  it('shows an error banner for invalid JSON', () => {
    render(<JsonPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('JSON input'), {
      target: { value: '{not json}' },
    });
    expect(screen.getByTestId('json-output').textContent).toMatch(
      /Unexpected token|JSON/i,
    );
  });

  it('minifies the input when Minify is clicked', () => {
    render(<JsonPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.change(screen.getByLabelText('JSON input'), {
      target: { value: '{\n  "a": 1\n}' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Minify' }));
    expect(screen.getByLabelText('JSON input')).toHaveValue('{"a":1}');
  });

  it('copies the formatted output', () => {
    const onCopy = vi.fn();
    render(<JsonPanel t={enToolbox} onCopy={onCopy} />);
    fireEvent.change(screen.getByLabelText('JSON input'), {
      target: { value: '{"a":1}' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledWith('{\n  "a": 1\n}', 'JSON');
  });
});
