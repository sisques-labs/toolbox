const LOREM_WORDS = [
  'lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'enim',
  'ad',
  'minim',
  'veniam',
  'quis',
  'nostrud',
  'exercitation',
  'ullamco',
  'laboris',
  'nisi',
  'aliquip',
  'ex',
  'ea',
  'commodo',
  'consequat',
];

export class GenerateLoremUseCase {
  execute(paragraphCount: number): string {
    const paragraphs: string[] = [];
    for (let p = 0; p < paragraphCount; p++) {
      const sentenceCount = 3 + Math.floor(Math.random() * 3);
      const sentences: string[] = [];
      for (let i = 0; i < sentenceCount; i++) sentences.push(this.sentence());
      paragraphs.push(sentences.join(' '));
    }
    return paragraphs.join('\n\n');
  }

  private sentence(): string {
    const length = 6 + Math.floor(Math.random() * 10);
    const words: string[] = [];
    for (let i = 0; i < length; i++) {
      words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
    }
    const sentence = words.join(' ');
    return sentence[0].toUpperCase() + sentence.slice(1) + '.';
  }
}
