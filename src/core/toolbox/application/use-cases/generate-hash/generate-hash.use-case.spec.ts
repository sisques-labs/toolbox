import { GenerateHashUseCase } from './generate-hash.use-case';

describe('GenerateHashUseCase', () => {
  const useCase = new GenerateHashUseCase();

  it('computes MD5 and SHA hashes of the input text', async () => {
    const result = await useCase.execute('Toolbox');

    expect(result).toEqual({
      md5: '867748323b222a2e63666df4061a041b',
      sha1: '692107c06c0977c1dc0a996f6586e460afeca4ae',
      sha256:
        '95ddf8e9a1b838e10aedf778673fb562a2a76bc738a604add5200fcac649e832'.slice(
          0,
          64,
        ),
      sha512:
        '1283ca7eece16aeb62bf5da7b382ab08240fb07447b9d15cb52d8f317b600f4b359402749bc68ddaa0e8f3007c3e1e31e9b5a4eba91a27af4f14b725d01486bf'.slice(
          0,
          128,
        ),
    });
  });

  it('hashes the empty string', async () => {
    const result = await useCase.execute('');

    expect(result.md5).toBe('d41d8cd98f00b204e9800998ecf8427e');
    expect(result.sha1).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
  });

  it('matches known test vectors for "abc"', async () => {
    const result = await useCase.execute('abc');

    expect(result.md5).toBe('900150983cd24fb0d6963f7d28e17f72');
    expect(result.sha256).toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'.slice(
        0,
        64,
      ),
    );
  });
});
