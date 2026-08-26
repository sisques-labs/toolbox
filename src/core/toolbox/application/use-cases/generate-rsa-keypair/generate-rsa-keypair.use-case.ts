export interface RsaKeypair {
  publicKeyPem: string;
  privateKeyPem: string;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function toPem(base64: string, label: string): string {
  const lines = base64.match(/.{1,64}/g) ?? [];
  return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----\n`;
}

export class GenerateRsaKeypairUseCase {
  async execute(modulusLength: 2048 | 4096): Promise<RsaKeypair> {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['sign', 'verify'],
    );

    const [publicKeyDer, privateKeyDer] = await Promise.all([
      crypto.subtle.exportKey('spki', keyPair.publicKey),
      crypto.subtle.exportKey('pkcs8', keyPair.privateKey),
    ]);

    return {
      publicKeyPem: toPem(arrayBufferToBase64(publicKeyDer), 'PUBLIC KEY'),
      privateKeyPem: toPem(arrayBufferToBase64(privateKeyDer), 'PRIVATE KEY'),
    };
  }
}
