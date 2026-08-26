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

  it('skips comments and blank lines when parsing YAML', () => {
    const result = useCase.execute('# comment\n\nname: toolbox', 'yamlToJson');

    expect(JSON.parse(result)).toEqual({ name: 'toolbox' });
  });

  it('parses a nested list under a map key', () => {
    const result = useCase.execute('tags:\n  - a\n  - b', 'yamlToJson');

    expect(JSON.parse(result)).toEqual({ tags: ['a', 'b'] });
  });

  it('parses a nested map under a map key', () => {
    const result = useCase.execute(
      'person:\n  name: Ana\n  age: 3',
      'yamlToJson',
    );

    expect(JSON.parse(result)).toEqual({ person: { name: 'Ana', age: 3 } });
  });

  it('parses quoted scalars, booleans and null markers', () => {
    const result = useCase.execute(
      'a: "hi"\nb: \'yo\'\nc: true\nd: false\ne: null\nf: ~',
      'yamlToJson',
    );

    expect(JSON.parse(result)).toEqual({
      a: 'hi',
      b: 'yo',
      c: true,
      d: false,
      e: null,
      f: null,
    });
  });

  it('parses a float scalar', () => {
    const result = useCase.execute('a: 3.14', 'yamlToJson');

    expect(JSON.parse(result)).toEqual({ a: 3.14 });
  });

  it('parses an inline array scalar', () => {
    const result = useCase.execute('a: [1, 2, three]', 'yamlToJson');

    expect(JSON.parse(result)).toEqual({ a: [1, 2, 'three'] });
  });

  it('parses a top-level list of plain scalars', () => {
    const result = useCase.execute('- a\n- b', 'yamlToJson');

    expect(JSON.parse(result)).toEqual(['a', 'b']);
  });

  it('converts null, number and boolean values back to YAML', () => {
    const json = JSON.stringify({ a: null, b: 3, c: true });

    const result = useCase.execute(json, 'jsonToYaml');

    expect(result).toBe('a: null\nb: 3\nc: true');
  });

  it('quotes a YAML string value that needs escaping', () => {
    const json = JSON.stringify({ a: 'hi there!' });

    const result = useCase.execute(json, 'jsonToYaml');

    expect(result).toBe('a: "hi there!"');
  });

  it('converts empty arrays and objects to inline YAML', () => {
    const json = JSON.stringify({ a: [], b: {} });

    const result = useCase.execute(json, 'jsonToYaml');

    expect(result).toBe('a: []\nb: {}');
  });

  it('converts an array of objects to a YAML list', () => {
    const json = JSON.stringify({ list: [{ x: 1 }, { y: 2 }] });

    const result = useCase.execute(json, 'jsonToYaml');

    expect(result).toBe('list:\n  - x: 1\n  - y: 2');
  });

  it('converts an array of primitives to a YAML list', () => {
    const json = JSON.stringify({ list: [1, 2, 3] });

    const result = useCase.execute(json, 'jsonToYaml');

    expect(result).toBe('list:\n  - 1\n  - 2\n  - 3');
  });
});
