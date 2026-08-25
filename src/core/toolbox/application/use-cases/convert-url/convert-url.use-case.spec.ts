import { ConvertUrlUseCase } from './convert-url.use-case';

describe('ConvertUrlUseCase', () => {
  const useCase = new ConvertUrlUseCase();

  it('encodes reserved characters', () => {
    const result = useCase.execute('hello world?a=1&b=2', 'encode');

    expect(result).toEqual({
      ok: true,
      text: 'hello%20world%3Fa%3D1%26b%3D2',
    });
  });

  it('decodes percent-encoded text', () => {
    const result = useCase.execute('hello%20world%3Fa%3D1', 'decode');

    expect(result).toEqual({ ok: true, text: 'hello world?a=1' });
  });

  it('round-trips UTF-8 text', () => {
    const original = 'café & ñoño';

    const encoded = useCase.execute(original, 'encode');
    const decoded = useCase.execute(encoded.text, 'decode');

    expect(decoded).toEqual({ ok: true, text: original });
  });

  it('reports invalid percent-encoding when decoding', () => {
    const result = useCase.execute('%E0%A4%A', 'decode');

    expect(result.ok).toBe(false);
  });
});
