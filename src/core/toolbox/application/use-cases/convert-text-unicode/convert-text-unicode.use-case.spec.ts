import { ConvertTextUnicodeUseCase } from './convert-text-unicode.use-case';

describe('ConvertTextUnicodeUseCase', () => {
  const useCase = new ConvertTextUnicodeUseCase();

  it('converts text to space-separated code points', () => {
    expect(useCase.toUnicode('Hi')).toBe('U+0048 U+0069');
  });

  it('converts code points back to text', () => {
    expect(useCase.fromUnicode('U+0048 U+0069')).toEqual({
      ok: true,
      text: 'Hi',
    });
  });

  it('round-trips text with characters outside the BMP', () => {
    const unicode = useCase.toUnicode('😀');
    expect(useCase.fromUnicode(unicode)).toEqual({ ok: true, text: '😀' });
  });

  it('rejects malformed code point tokens', () => {
    expect(useCase.fromUnicode('U+ZZZZ').ok).toBe(false);
  });
});
