import { FormatJsonUseCase } from './format-json.use-case';

describe('FormatJsonUseCase', () => {
  const useCase = new FormatJsonUseCase();

  it('formats valid JSON with a 2-space indent', () => {
    const result = useCase.execute('{"a":1,"b":[2,3]}', '2');

    expect(result).toEqual({
      ok: true,
      text: '{\n  "a": 1,\n  "b": [\n    2,\n    3\n  ]\n}',
    });
  });

  it('formats valid JSON with a 4-space indent', () => {
    const result = useCase.execute('{"a":1}', '4');

    expect(result).toEqual({ ok: true, text: '{\n    "a": 1\n}' });
  });

  it('formats valid JSON with a tab indent', () => {
    const result = useCase.execute('{"a":1}', 'tab');

    expect(result).toEqual({ ok: true, text: '{\n\t"a": 1\n}' });
  });

  it('reports invalid JSON without throwing', () => {
    const result = useCase.execute('{not json}', '2');

    expect(result.ok).toBe(false);
    expect(result.text.length).toBeGreaterThan(0);
  });

  it('minifies valid JSON', () => {
    expect(useCase.minify('{\n  "a": 1\n}')).toBe('{"a":1}');
  });

  it('returns the original text unchanged when minifying invalid JSON', () => {
    expect(useCase.minify('{not json}')).toBe('{not json}');
  });
});
