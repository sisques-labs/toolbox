import { SearchHttpStatusCodesUseCase } from './search-http-status-codes.use-case';

describe('SearchHttpStatusCodesUseCase', () => {
  const useCase = new SearchHttpStatusCodesUseCase();

  it('returns the full catalog for an empty query', () => {
    const result = useCase.execute('');
    expect(result.length).toBeGreaterThan(50);
    expect(result[0]).toEqual({
      code: 100,
      phrase: 'Continue',
      category: 'informational',
    });
  });

  it('filters by exact code', () => {
    const result = useCase.execute('404');
    expect(result).toEqual([
      { code: 404, phrase: 'Not Found', category: 'clientError' },
    ]);
  });

  it('filters by partial code prefix', () => {
    const result = useCase.execute('50');
    expect(result.map((r) => r.code)).toEqual([
      500, 501, 502, 503, 504, 505, 506, 507, 508,
    ]);
  });

  it('filters by reason phrase, case-insensitively', () => {
    const result = useCase.execute('teapot');
    expect(result).toEqual([
      { code: 418, phrase: "I'm a Teapot", category: 'clientError' },
    ]);
  });

  it('returns an empty array when nothing matches', () => {
    expect(useCase.execute('nonexistent-status')).toEqual([]);
  });

  it('categorizes every entry by its status class', () => {
    const result = useCase.execute('');
    for (const entry of result) {
      const expectedCategory =
        entry.code < 200
          ? 'informational'
          : entry.code < 300
            ? 'success'
            : entry.code < 400
              ? 'redirection'
              : entry.code < 500
                ? 'clientError'
                : 'serverError';
      expect(entry.category).toBe(expectedCategory);
    }
  });
});
