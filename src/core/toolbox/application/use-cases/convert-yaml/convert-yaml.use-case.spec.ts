import { ConvertYamlUseCase } from './convert-yaml.use-case';

describe('ConvertYamlUseCase', () => {
  const useCase = new ConvertYamlUseCase();

  it('converts YAML to JSON', () => {
    const yaml = 'name: toolbox\nversion: 1\ntags:\n  - dev\n  - tools';

    const result = useCase.execute(yaml, 'yamlToJson');

    expect(JSON.parse(result)).toEqual({
      name: 'toolbox',
      version: 1,
      tags: ['dev', 'tools'],
    });
  });

  it('converts JSON to YAML', () => {
    const json = JSON.stringify({ name: 'toolbox', version: 1 });

    const result = useCase.execute(json, 'jsonToYaml');

    expect(result).toBe('name: toolbox\nversion: 1');
  });

  it('round-trips an object through YAML and back to JSON', () => {
    const original = { name: 'toolbox', tags: ['dev', 'tools'], version: 1 };
    const yaml = useCase.execute(JSON.stringify(original), 'jsonToYaml');

    const roundTripped = JSON.parse(useCase.execute(yaml, 'yamlToJson'));

    expect(roundTripped).toEqual(original);
  });

  it('reports a conversion error without throwing', () => {
    const result = useCase.execute('{not json}', 'jsonToYaml');

    expect(result).toMatch(/^Could not convert:/);
  });
});
