import { SearchMimeTypesUseCase } from './search-mime-types.use-case';

describe('SearchMimeTypesUseCase', () => {
  const useCase = new SearchMimeTypesUseCase();

  it('returns every entry for an empty query', () => {
    expect(useCase.execute('').length).toBeGreaterThan(10);
  });

  it('finds an entry by extension, with or without the leading dot', () => {
    expect(useCase.execute('.json')).toContainEqual({
      extension: '.json',
      mimeType: 'application/json',
    });
    expect(useCase.execute('json')).toContainEqual({
      extension: '.json',
      mimeType: 'application/json',
    });
  });

  it('finds entries by matching the mime type', () => {
    const results = useCase.execute('image/');
    expect(results.length).toBeGreaterThan(1);
    expect(results.every((r) => r.mimeType.startsWith('image/'))).toBe(true);
  });

  it('returns an empty list for an unmatched query', () => {
    expect(useCase.execute('not-a-real-type-xyz')).toEqual([]);
  });
});
