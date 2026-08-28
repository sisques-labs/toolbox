import { ConvertBase64UseCase } from './convert-base64.use-case';

describe('ConvertBase64UseCase', () => {
  const useCase = new ConvertBase64UseCase();

  it('encodes plain text to Base64', () => {
    const result = useCase.execute('Hello, Toolbox!', 'encode');

    expect(result).toEqual({ ok: true, text: btoa('Hello, Toolbox!') });
  });

  it('decodes Base64 back to the original text', () => {
    const encoded = btoa('Hello, Toolbox!');

    const result = useCase.execute(encoded, 'decode');

    expect(result).toEqual({ ok: true, text: 'Hello, Toolbox!' });
  });

  it('round-trips UTF-8 text through encode and decode', () => {
    const original = 'Ñoño — café ☕';

    const encoded = useCase.execute(original, 'encode');
    const decoded = useCase.execute(encoded.text, 'decode');

    expect(decoded).toEqual({ ok: true, text: original });
  });

  it('reports invalid Base64 input when decoding', () => {
    const result = useCase.execute('not valid base64 !!!', 'decode');

    expect(result.ok).toBe(false);
  });
});
