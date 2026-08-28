import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { TomlJsonPanel } from './toml-json-panel';

describe('TomlJsonPanel', () => {
  it('converts the default TOML to JSON', () => {
    render(<TomlJsonPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('toml-json-output').textContent).toContain(
      '"title"',
    );
  });

  it('converts JSON to TOML in JSON → TOML mode', () => {
    render(<TomlJsonPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'JSON → TOML' }));
    fireEvent.change(screen.getByLabelText('JSON input'), {
      target: { value: '{"title":"Toolbox"}' },
    });
    expect(screen.getByTestId('toml-json-output').textContent).toBe(
      'title = "Toolbox"',
    );
  });
});
