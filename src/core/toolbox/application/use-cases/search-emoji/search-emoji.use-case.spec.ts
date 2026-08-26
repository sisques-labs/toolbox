import { SearchEmojiUseCase } from './search-emoji.use-case';

describe('SearchEmojiUseCase', () => {
  const useCase = new SearchEmojiUseCase();

  it('returns every entry for an empty query', () => {
    expect(useCase.execute('').length).toBeGreaterThan(20);
  });

  it('finds an entry by matching the name', () => {
    expect(useCase.execute('fire')).toContainEqual({
      emoji: '🔥',
      name: 'fire',
    });
  });

  it('is case-insensitive', () => {
    expect(useCase.execute('FIRE')).toContainEqual({
      emoji: '🔥',
      name: 'fire',
    });
  });

  it('returns an empty list for an unmatched query', () => {
    expect(useCase.execute('not-a-real-emoji-name-xyz')).toEqual([]);
  });
});
