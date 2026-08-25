export interface CaseConversionResult {
  camelCase: string;
  pascalCase: string;
  snakeCase: string;
  kebabCase: string;
  constantCase: string;
  titleCase: string;
}

export class ConvertCaseUseCase {
  execute(text: string): CaseConversionResult {
    const words = this.splitWords(text);

    return {
      camelCase: words
        .map((word, i) =>
          i === 0 ? word.toLowerCase() : this.capitalize(word),
        )
        .join(''),
      pascalCase: words.map((word) => this.capitalize(word)).join(''),
      snakeCase: words.map((word) => word.toLowerCase()).join('_'),
      kebabCase: words.map((word) => word.toLowerCase()).join('-'),
      constantCase: words.map((word) => word.toUpperCase()).join('_'),
      titleCase: words.map((word) => this.capitalize(word)).join(' '),
    };
  }

  private splitWords(text: string): string[] {
    return String(text)
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(/[\s_-]+/)
      .filter(Boolean);
  }

  private capitalize(word: string): string {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
}
