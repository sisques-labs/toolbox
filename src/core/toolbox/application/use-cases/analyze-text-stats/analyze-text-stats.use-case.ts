export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
}

const WORDS_PER_MINUTE = 200;

function countWords(trimmed: string): number {
  return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
}

function countSentences(trimmed: string): number {
  if (trimmed === '') return 0;
  const matches = trimmed.match(/[^.!?]+[.!?]+/g);
  return matches ? matches.length : 1;
}

function countParagraphs(trimmed: string): number {
  if (trimmed === '') return 0;
  return trimmed
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean).length;
}

export class AnalyzeTextStatsUseCase {
  execute(text: string): TextStats {
    const trimmed = text.trim();
    const words = countWords(trimmed);

    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, '').length,
      words,
      sentences: countSentences(trimmed),
      paragraphs: countParagraphs(trimmed),
      readingTimeMinutes: words === 0 ? 0 : Math.ceil(words / WORDS_PER_MINUTE),
    };
  }
}
