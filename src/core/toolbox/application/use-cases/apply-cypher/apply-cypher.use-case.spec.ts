import { ApplyCypherUseCase } from './apply-cypher.use-case';

describe('ApplyCypherUseCase', () => {
  const useCase = new ApplyCypherUseCase();

  it('shifts letters forward by the given amount, preserving case', () => {
    expect(useCase.execute('Hello, World!', 3)).toBe('Khoor, Zruog!');
  });

  it('wraps around the alphabet', () => {
    expect(useCase.execute('xyz', 3)).toBe('abc');
  });

  it('leaves non-letters untouched', () => {
    expect(useCase.execute('a1 b2!', 1)).toBe('b1 c2!');
  });

  it('shifting back by the same amount restores the original text', () => {
    const encoded = useCase.execute('The Quick Fox', 13);
    expect(useCase.execute(encoded, -13)).toBe('The Quick Fox');
  });

  it('normalizes shifts outside of -25..25', () => {
    expect(useCase.execute('abc', 29)).toBe(useCase.execute('abc', 3));
  });
});
