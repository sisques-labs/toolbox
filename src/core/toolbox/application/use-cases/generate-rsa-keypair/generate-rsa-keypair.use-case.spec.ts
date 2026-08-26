import { GenerateRsaKeypairUseCase } from './generate-rsa-keypair.use-case';

describe('GenerateRsaKeypairUseCase', () => {
  const useCase = new GenerateRsaKeypairUseCase();

  it('generates a PEM-wrapped public and private key pair', async () => {
    const { publicKeyPem, privateKeyPem } = await useCase.execute(2048);

    expect(publicKeyPem).toMatch(/^-----BEGIN PUBLIC KEY-----\n/);
    expect(publicKeyPem.trim()).toMatch(/-----END PUBLIC KEY-----$/);
    expect(privateKeyPem).toMatch(/^-----BEGIN PRIVATE KEY-----\n/);
    expect(privateKeyPem.trim()).toMatch(/-----END PRIVATE KEY-----$/);
  });

  it('produces a public key that can be re-imported', async () => {
    const { publicKeyPem } = await useCase.execute(2048);
    const der = publicKeyPem
      .replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', '')
      .replace(/\s/g, '');
    const bytes = Uint8Array.from(atob(der), (c) => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
      'spki',
      bytes,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      true,
      ['verify'],
    );

    expect(key.type).toBe('public');
  });

  it('generates different key pairs on each call', async () => {
    const a = await useCase.execute(2048);
    const b = await useCase.execute(2048);
    expect(a.publicKeyPem).not.toBe(b.publicKeyPem);
  });
});
