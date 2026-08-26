function numeronymizeWord(word: string): string {
  if (word.length <= 5) return word;
  return `${word[0]}${word.length - 2}${word[word.length - 1]}`;
}

export class GenerateNumeronymUseCase {
  execute(text: string): string {
    return text
      .split(/(\s+)/)
      .map((token) => (/^\s+$/.test(token) ? token : numeronymizeWord(token)))
      .join('');
  }
}
