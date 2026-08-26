import { AnalyzeTextStatsUseCase } from './analyze-text-stats.use-case';

describe('AnalyzeTextStatsUseCase', () => {
  const useCase = new AnalyzeTextStatsUseCase();

  it('returns all-zero stats for empty input', () => {
    expect(useCase.execute('')).toEqual({
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
    });
  });

  it('counts characters, including and excluding whitespace', () => {
    const result = useCase.execute('Hello world');
    expect(result.characters).toBe(11);
    expect(result.charactersNoSpaces).toBe(10);
  });

  it('counts words', () => {
    expect(useCase.execute('Hello   world  foo').words).toBe(3);
  });

  it('counts sentences terminated by . ! or ?', () => {
    expect(
      useCase.execute('Hello world. This is a test! Really?').sentences,
    ).toBe(3);
  });

  it('counts a single sentence with no terminal punctuation as one', () => {
    expect(useCase.execute('Hello world').sentences).toBe(1);
  });

  it('counts paragraphs separated by blank lines', () => {
    const text = 'First paragraph.\n\nSecond paragraph.';
    expect(useCase.execute(text).paragraphs).toBe(2);
  });

  it('estimates reading time at 200 words per minute, rounding up to at least 1 minute for non-empty text', () => {
    const words = Array(50).fill('word').join(' ');
    expect(useCase.execute(words).readingTimeMinutes).toBe(1);

    const manyWords = Array(450).fill('word').join(' ');
    expect(useCase.execute(manyWords).readingTimeMinutes).toBe(3);
  });
});
