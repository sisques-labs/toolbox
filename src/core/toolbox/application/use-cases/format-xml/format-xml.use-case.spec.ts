import { FormatXmlUseCase } from './format-xml.use-case';

describe('FormatXmlUseCase', () => {
  const useCase = new FormatXmlUseCase();

  it('pretty-prints a minified XML document', () => {
    const result = useCase.format('<root><a>1</a><b>2</b></root>', 2);
    expect(result).toEqual({
      ok: true,
      formatted: '<root>\n  <a>1</a>\n  <b>2</b>\n</root>',
    });
  });

  it('minifies a pretty-printed XML document', () => {
    const result = useCase.minify('<root>\n  <a>1</a>\n  <b>2</b>\n</root>');
    expect(result).toEqual({
      ok: true,
      formatted: '<root><a>1</a><b>2</b></root>',
    });
  });

  it('handles self-closing tags', () => {
    const result = useCase.format('<root><a/><b/></root>', 2);
    expect(result).toEqual({
      ok: true,
      formatted: '<root>\n  <a/>\n  <b/>\n</root>',
    });
  });

  it('rejects malformed XML', () => {
    expect(useCase.format('<root><a></root>', 2).ok).toBe(false);
  });
});
