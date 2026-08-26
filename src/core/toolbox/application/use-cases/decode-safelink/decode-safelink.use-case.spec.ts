import { DecodeSafelinkUseCase } from './decode-safelink.use-case';

describe('DecodeSafelinkUseCase', () => {
  const useCase = new DecodeSafelinkUseCase();

  it('decodes an Outlook Safe Links URL', () => {
    const wrapped =
      'https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fexample.com%2Fpath%3Fa%3D1&data=abc';
    expect(useCase.execute(wrapped)).toEqual({
      ok: true,
      url: 'https://example.com/path?a=1',
    });
  });

  it('decodes a Google redirect URL', () => {
    const wrapped =
      'https://www.google.com/url?q=https%3A%2F%2Fexample.com%2F&sa=D';
    expect(useCase.execute(wrapped)).toEqual({
      ok: true,
      url: 'https://example.com/',
    });
  });

  it('rejects a URL with no recognizable wrapper parameter', () => {
    expect(useCase.execute('https://example.com').ok).toBe(false);
  });

  it('rejects an invalid URL', () => {
    expect(useCase.execute('not a url').ok).toBe(false);
  });
});
