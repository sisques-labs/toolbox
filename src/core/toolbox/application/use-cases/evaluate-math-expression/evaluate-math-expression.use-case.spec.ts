import { EvaluateMathExpressionUseCase } from './evaluate-math-expression.use-case';

describe('EvaluateMathExpressionUseCase', () => {
  const useCase = new EvaluateMathExpressionUseCase();

  it('evaluates operator precedence correctly', () => {
    expect(useCase.execute('2 + 3 * 4')).toEqual({ ok: true, value: 14 });
  });

  it('respects parentheses', () => {
    expect(useCase.execute('(2 + 3) * 4')).toEqual({ ok: true, value: 20 });
  });

  it('supports exponentiation', () => {
    expect(useCase.execute('2 ^ 10')).toEqual({ ok: true, value: 1024 });
  });

  it('supports unary minus', () => {
    expect(useCase.execute('-5 + 3')).toEqual({ ok: true, value: -2 });
  });

  it('supports known functions and constants', () => {
    expect(useCase.execute('sqrt(16)')).toEqual({ ok: true, value: 4 });
    expect(useCase.execute('round(pi)')).toEqual({ ok: true, value: 3 });
  });

  it('rejects a malformed expression', () => {
    expect(useCase.execute('2 + * 3').ok).toBe(false);
  });

  it('rejects unknown identifiers instead of throwing', () => {
    expect(useCase.execute('foo(1)').ok).toBe(false);
  });
});
