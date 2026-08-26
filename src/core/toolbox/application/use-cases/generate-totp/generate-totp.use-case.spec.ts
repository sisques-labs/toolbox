import { GenerateTotpUseCase } from './generate-totp.use-case';

describe('GenerateTotpUseCase', () => {
  const useCase = new GenerateTotpUseCase();

  it('generates a 6-digit code for a known secret and time', async () => {
    // RFC 6238 SHA-1 vector (T=59) truncated to 6 digits with ASCII secret.
    const result = await useCase.execute({
      secret: asciiToBase32('12345678901234567890'),
      nowMs: 59_000,
      digits: 6,
      periodSeconds: 30,
    });

    expect(result).toEqual({
      ok: true,
      code: '287082',
      remainingSeconds: 1,
      periodSeconds: 30,
    });
  });

  it('rejects an invalid base32 secret', async () => {
    const result = await useCase.execute({
      secret: '!!!',
      nowMs: 0,
    });

    expect(result).toEqual({ ok: false, error: 'invalidSecret' });
  });
});

function asciiToBase32(input: string): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const bytes = Uint8Array.from(input, (c) => c.charCodeAt(0));
  let bits = 0;
  let value = 0;
  let output = '';
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }
  return output;
}
