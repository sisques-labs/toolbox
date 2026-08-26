import { fireEvent, render, screen } from '@testing-library/react';
import enToolbox from '@/core/toolbox/presentation/i18n/en';
import { TomlYamlPanel } from './toml-yaml-panel';

describe('TomlYamlPanel', () => {
  it('converts the default TOML to YAML', () => {
    render(<TomlYamlPanel t={enToolbox} onCopy={() => {}} />);
    expect(screen.getByTestId('toml-yaml-output').textContent).toContain(
      'title: Toolbox',
    );
  });

  it('converts YAML to TOML in YAML → TOML mode', () => {
    render(<TomlYamlPanel t={enToolbox} onCopy={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'YAML → TOML' }));
    fireEvent.change(screen.getByLabelText('YAML input'), {
      target: { value: 'title: Toolbox' },
    });
    expect(screen.getByTestId('toml-yaml-output').textContent).toBe(
      'title = "Toolbox"',
    );
  });
});
