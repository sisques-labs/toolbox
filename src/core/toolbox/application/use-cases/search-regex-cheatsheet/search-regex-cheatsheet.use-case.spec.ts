import { SearchRegexCheatsheetUseCase } from './search-regex-cheatsheet.use-case';

describe('SearchRegexCheatsheetUseCase', () => {
  const useCase = new SearchRegexCheatsheetUseCase();

  it('returns every entry for an empty query', () => {
    expect(useCase.execute('').length).toBeGreaterThan(10);
  });

  it('finds an entry by matching the token', () => {
    expect(useCase.execute('\\d').some((e) => e.token === '\\d')).toBe(true);
  });

  it('finds an entry by matching the description', () => {
    expect(
      useCase
        .execute('digit')
        .some((e) => e.description.toLowerCase().includes('digit')),
    ).toBe(true);
  });

  it('returns an empty list for an unmatched query', () => {
    expect(useCase.execute('not-a-real-regex-token-xyz')).toEqual([]);
  });
});
