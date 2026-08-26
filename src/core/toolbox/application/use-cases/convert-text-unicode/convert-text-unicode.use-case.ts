export interface TextUnicodeResult {
  ok: boolean;
  text?: string;
}

export class ConvertTextUnicodeUseCase {
  toUnicode(text: string): string {
    return [...text]
      .map(
        (char) =>
          `U+${char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`,
      )
      .join(' ');
  }

  fromUnicode(unicode: string): TextUnicodeResult {
    const tokens = unicode.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return { ok: false };
    if (tokens.some((t) => !/^U\+[0-9a-fA-F]{1,6}$/.test(t))) {
      return { ok: false };
    }

    const text = tokens
      .map((t) => String.fromCodePoint(parseInt(t.slice(2), 16)))
      .join('');
    return { ok: true, text };
  }
}
