import { ConvertNatoAlphabetUseCase } from './convert-nato-alphabet.use-case';

describe('ConvertNatoAlphabetUseCase', () => {
  const useCase = new ConvertNatoAlphabetUseCase();

  it('converts a single word to its NATO phonetic spelling', () => {
    expect(useCase.execute('SOS')).toBe('Sierra Oscar Sierra');
  });

  it('is case-insensitive', () => {
    expect(useCase.execute('abc')).toBe('Alpha Bravo Charlie');
  });

  it('converts digits to their spoken words', () => {
    expect(useCase.execute('123')).toBe('One Two Three');
  });

  it('separates multiple words with a slash', () => {
    expect(useCase.execute('SOS 123')).toBe(
      'Sierra Oscar Sierra / One Two Three',
    );
  });

  it('preserves punctuation characters as-is', () => {
    expect(useCase.execute('a-1')).toBe('Alpha - One');
  });

  it('returns an empty string for empty input', () => {
    expect(useCase.execute('')).toBe('');
  });
});
