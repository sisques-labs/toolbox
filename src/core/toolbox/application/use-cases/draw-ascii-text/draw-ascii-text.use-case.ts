import { ASCII_FONT, BLANK_GLYPH, GLYPH_HEIGHT } from './ascii-font';

export class DrawAsciiTextUseCase {
  execute(text: string): string {
    if (!text) return '';

    const glyphs = [...text.toUpperCase()].map(
      (char) => ASCII_FONT[char] ?? BLANK_GLYPH,
    );

    const lines: string[] = [];
    for (let row = 0; row < GLYPH_HEIGHT; row++) {
      lines.push(glyphs.map((glyph) => glyph[row]).join(' '));
    }
    return lines.join('\n');
  }
}
