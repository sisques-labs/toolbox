import { TestRegexUseCase } from './test-regex.use-case';

describe('TestRegexUseCase', () => {
  const useCase = new TestRegexUseCase();

  it('finds all global matches', () => {
    expect(
      useCase.execute({
        pattern: '\\w+',
        flags: 'g',
        text: 'hello world',
      }),
    ).toEqual({
      ok: true,
      matches: [
        { value: 'hello', index: 0, groups: [] },
        { value: 'world', index: 6, groups: [] },
      ],
    });
  });

  it('captures groups', () => {
    expect(
      useCase.execute({
        pattern: '(\\d+)-(\\w+)',
        flags: '',
        text: '42-answer and more',
      }),
    ).toEqual({
      ok: true,
      matches: [{ value: '42-answer', index: 0, groups: ['42', 'answer'] }],
    });
  });

  it('returns an empty list when nothing matches', () => {
    expect(
      useCase.execute({
        pattern: 'zzz',
        flags: 'g',
        text: 'hello',
      }),
    ).toEqual({ ok: true, matches: [] });
  });

  it('reports invalid patterns', () => {
    expect(
      useCase.execute({
        pattern: '(',
        flags: 'g',
        text: 'x',
      }),
    ).toEqual({ ok: false, error: 'invalid' });
  });

  it('rejects invalid flags', () => {
    expect(
      useCase.execute({
        pattern: 'a',
        flags: 'z',
        text: 'a',
      }),
    ).toEqual({ ok: false, error: 'invalid' });
  });
});
