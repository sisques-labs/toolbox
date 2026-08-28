export type HmacAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

export class GenerateHmacUseCase {
  async execute(
    message: string,
    secret: string,
    algorithm: HmacAlgorithm,
  ): Promise<string> {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: algorithm },
      false,
      ['sign'],
    );
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(message),
    );
    return [...new Uint8Array(signature)]
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
