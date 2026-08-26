import { ConvertTomlYamlUseCase } from './convert-toml-yaml.use-case';

describe('ConvertTomlYamlUseCase', () => {
  const useCase = new ConvertTomlYamlUseCase();
  const TOML = 'title = "Toolbox"\nversion = 1';
  const YAML = 'title: Toolbox\nversion: 1';

  it('converts TOML to YAML', () => {
    expect(useCase.tomlToYaml(TOML)).toEqual({ ok: true, yaml: YAML });
  });

  it('converts YAML back to TOML', () => {
    expect(useCase.yamlToToml(YAML)).toEqual({ ok: true, toml: TOML });
  });

  it('rejects malformed TOML', () => {
    expect(useCase.tomlToYaml('not a valid line').ok).toBe(false);
  });
});
