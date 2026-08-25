import { DecodeJwtUseCase } from './decode-jwt.use-case';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

describe('DecodeJwtUseCase', () => {
  const useCase = new DecodeJwtUseCase();

  it('decodes the header and payload of a valid JWT', () => {
    const result = useCase.execute(SAMPLE_JWT);

    expect(result.ok).toBe(true);
    expect(JSON.parse(result.header ?? '')).toEqual({
      alg: 'HS256',
      typ: 'JWT',
    });
    expect(JSON.parse(result.payload ?? '')).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    });
    expect(result.signature).toBe(
      'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    );
  });

  it('rejects a token with fewer than two segments', () => {
    const result = useCase.execute('not-a-jwt');

    expect(result).toEqual({
      ok: false,
      error: 'Not a valid JWT — expected 3 dot-separated parts.',
    });
  });

  it('rejects a token whose segments are not valid base64url JSON', () => {
    const result = useCase.execute('not.valid.jwt');

    expect(result).toEqual({
      ok: false,
      error: 'Could not decode this token.',
    });
  });
});
