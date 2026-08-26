import { DiffTextUseCase } from './diff-text.use-case';

describe('DiffTextUseCase', () => {
  const useCase = new DiffTextUseCase();

  it('returns equal lines when texts match', () => {
    expect(useCase.execute('a\nb', 'a\nb')).toEqual({
      lines: [
        { kind: 'equal', text: 'a' },
        { kind: 'equal', text: 'b' },
      ],
    });
  });

  it('marks added and removed lines', () => {
    expect(useCase.execute('hello\nworld', 'hello\nthere')).toEqual({
      lines: [
        { kind: 'equal', text: 'hello' },
        { kind: 'removed', text: 'world' },
        { kind: 'added', text: 'there' },
      ],
    });
  });

  it('handles empty left side as all additions', () => {
    expect(useCase.execute('', 'one\ntwo')).toEqual({
      lines: [
        { kind: 'added', text: 'one' },
        { kind: 'added', text: 'two' },
      ],
    });
  });
});
