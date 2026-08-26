import { SearchGitCheatsheetUseCase } from './search-git-cheatsheet.use-case';

describe('SearchGitCheatsheetUseCase', () => {
  const useCase = new SearchGitCheatsheetUseCase();

  it('returns every entry for an empty query', () => {
    expect(useCase.execute('').length).toBeGreaterThan(10);
  });

  it('finds an entry by matching the command', () => {
    expect(
      useCase.execute('rebase').some((e) => e.command.includes('rebase')),
    ).toBe(true);
  });

  it('finds an entry by matching the description', () => {
    expect(
      useCase
        .execute('undo')
        .some((e) => e.description.toLowerCase().includes('undo')),
    ).toBe(true);
  });

  it('returns an empty list for an unmatched query', () => {
    expect(useCase.execute('not-a-real-git-thing-xyz')).toEqual([]);
  });
});
