export interface RegexCheatsheetEntry {
  token: string;
  description: string;
}

const ENTRIES: RegexCheatsheetEntry[] = [
  { token: '.', description: 'Any character except newline' },
  { token: '\\d', description: 'Any digit (0-9)' },
  { token: '\\D', description: 'Any non-digit' },
  {
    token: '\\w',
    description: 'Any word character (letter, digit, underscore)',
  },
  { token: '\\W', description: 'Any non-word character' },
  { token: '\\s', description: 'Any whitespace character' },
  { token: '\\S', description: 'Any non-whitespace character' },
  { token: '\\b', description: 'A word boundary' },
  { token: '^', description: 'Start of the string (or line, with the m flag)' },
  { token: '$', description: 'End of the string (or line, with the m flag)' },
  { token: '*', description: 'Zero or more of the previous token' },
  { token: '+', description: 'One or more of the previous token' },
  { token: '?', description: 'Zero or one of the previous token' },
  { token: '{n}', description: 'Exactly n of the previous token' },
  { token: '{n,}', description: 'n or more of the previous token' },
  { token: '{n,m}', description: 'Between n and m of the previous token' },
  { token: '[abc]', description: 'Any one of a, b or c' },
  { token: '[^abc]', description: 'Any character except a, b or c' },
  { token: '[a-z]', description: 'Any character in the range a to z' },
  { token: '(abc)', description: 'A capturing group' },
  { token: '(?:abc)', description: 'A non-capturing group' },
  { token: '(?<name>abc)', description: 'A named capturing group' },
  { token: 'a|b', description: 'Either a or b' },
  { token: '(?=abc)', description: 'Positive lookahead' },
  { token: '(?!abc)', description: 'Negative lookahead' },
  { token: '(?<=abc)', description: 'Positive lookbehind' },
  { token: '(?<!abc)', description: 'Negative lookbehind' },
  { token: 'g', description: 'Flag: global match, find all matches' },
  { token: 'i', description: 'Flag: case-insensitive match' },
  { token: 'm', description: 'Flag: multiline, ^ and $ match line boundaries' },
];

export class SearchRegexCheatsheetUseCase {
  execute(query: string): RegexCheatsheetEntry[] {
    const q = query.trim().toLowerCase();
    if (!q) return ENTRIES;

    return ENTRIES.filter(
      (entry) =>
        entry.token.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q),
    );
  }
}
