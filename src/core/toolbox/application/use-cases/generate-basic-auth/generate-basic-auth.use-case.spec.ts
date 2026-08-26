import { GenerateBasicAuthUseCase } from './generate-basic-auth.use-case';

describe('GenerateBasicAuthUseCase', () => {
  const useCase = new GenerateBasicAuthUseCase();

  it('encodes a username and password into a Basic auth header', () => {
    expect(useCase.encode('Aladdin', 'open sesame')).toBe(
      'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
    );
  });

  it('decodes a Basic auth header back into username and password', () => {
    expect(useCase.decode('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==')).toEqual({
      ok: true,
      username: 'Aladdin',
      password: 'open sesame',
    });
  });

  it('decodes even without the "Basic " prefix', () => {
    expect(useCase.decode('QWxhZGRpbjpvcGVuIHNlc2FtZQ==').ok).toBe(true);
  });

  it('rejects malformed base64', () => {
    expect(useCase.decode('not-base64!!').ok).toBe(false);
  });
});
