import { ConvertBase64FileUseCase } from './convert-base64-file.use-case';

describe('ConvertBase64FileUseCase', () => {
  const useCase = new ConvertBase64FileUseCase();

  it('builds a data URL from a mime type and base64 payload', () => {
    expect(useCase.buildDataUrl('aGVsbG8=', 'text/plain')).toBe(
      'data:text/plain;base64,aGVsbG8=',
    );
  });

  it('extracts the mime type and base64 payload from a data URL', () => {
    expect(useCase.extractBase64('data:text/plain;base64,aGVsbG8=')).toEqual({
      ok: true,
      mimeType: 'text/plain',
      base64: 'aGVsbG8=',
    });
  });

  it('rejects a string that is not a base64 data URL', () => {
    expect(useCase.extractBase64('not a data url').ok).toBe(false);
    expect(useCase.extractBase64('data:text/plain,hello').ok).toBe(false);
  });
});
