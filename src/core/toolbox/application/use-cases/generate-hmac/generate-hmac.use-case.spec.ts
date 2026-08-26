import { GenerateHmacUseCase } from './generate-hmac.use-case';

describe('GenerateHmacUseCase', () => {
  const useCase = new GenerateHmacUseCase();

  it('matches the well-known HMAC-SHA1 test vector', async () => {
    const mac = await useCase.execute(
      'The quick brown fox jumps over the lazy dog',
      'key',
      'SHA-1',
    );
    expect(mac).toBe('de7c9b85b8b78aa6bc8a7a36f70a90701c9db4d9');
  });

  it('matches the well-known HMAC-SHA256 test vector', async () => {
    const mac = await useCase.execute(
      'The quick brown fox jumps over the lazy dog',
      'key',
      'SHA-256',
    );
    expect(mac).toBe(
      'f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8',
    );
  });

  it('produces a different mac for a different secret', async () => {
    const a = await useCase.execute('message', 'secret-a', 'SHA-256');
    const b = await useCase.execute('message', 'secret-b', 'SHA-256');
    expect(a).not.toBe(b);
  });
});
