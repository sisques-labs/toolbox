import { DiffJsonUseCase } from './diff-json.use-case';

describe('DiffJsonUseCase', () => {
  const useCase = new DiffJsonUseCase();

  it('reports no differences for equal objects', () => {
    expect(useCase.execute('{"a":1}', '{"a":1}')).toEqual({
      ok: true,
      changes: [],
    });
  });

  it('detects added, removed and changed paths', () => {
    expect(
      useCase.execute(
        '{"name":"a","count":1,"extra":true}',
        '{"name":"b","count":1,"nested":{"x":2}}',
      ),
    ).toEqual({
      ok: true,
      changes: [
        { path: 'extra', kind: 'removed', before: true },
        { path: 'name', kind: 'changed', before: 'a', after: 'b' },
        { path: 'nested', kind: 'added', after: { x: 2 } },
      ],
    });
  });

  it('diffs nested paths', () => {
    expect(
      useCase.execute('{"user":{"age":20}}', '{"user":{"age":21}}'),
    ).toEqual({
      ok: true,
      changes: [{ path: 'user.age', kind: 'changed', before: 20, after: 21 }],
    });
  });

  it('reports invalid JSON', () => {
    expect(useCase.execute('{', '{}')).toEqual({
      ok: false,
      error: 'invalidLeft',
    });
    expect(useCase.execute('{}', '{')).toEqual({
      ok: false,
      error: 'invalidRight',
    });
  });
});
