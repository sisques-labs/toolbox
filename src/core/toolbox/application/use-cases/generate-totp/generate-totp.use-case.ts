export type TotpResult =
  | {
      ok: true;
      code: string;
      remainingSeconds: number;
      periodSeconds: number;
    }
  | { ok: false; error: 'invalidSecret' };

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function decodeBase32(input: string): Uint8Array | null {
  const cleaned = input.replace(/[\s=-]/g, '').toUpperCase();
  if (!cleaned || /[^A-Z2-7]/.test(cleaned)) return null;

  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (const char of cleaned) {
    const idx = BASE32_ALPHABET.indexOf(char);
    if (idx === -1) return null;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return new Uint8Array(bytes);
}

function counterToBytes(counter: number): Uint8Array {
  const bytes = new Uint8Array(8);
  let value = BigInt(counter);
  for (let i = 7; i >= 0; i--) {
    bytes[i] = Number(value & 0xffn);
    value >>= 8n;
  }
  return bytes;
}

async function hmacSha1(
  key: Uint8Array,
  message: Uint8Array,
): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key.buffer as ArrayBuffer,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    message.buffer as ArrayBuffer,
  );
  return new Uint8Array(signature);
}

function truncate(hmac: Uint8Array, digits: number): string {
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  const otp = binary % 10 ** digits;
  return String(otp).padStart(digits, '0');
}

export class GenerateTotpUseCase {
  async execute({
    secret,
    nowMs = Date.now(),
    digits = 6,
    periodSeconds = 30,
  }: {
    secret: string;
    nowMs?: number;
    digits?: number;
    periodSeconds?: number;
  }): Promise<TotpResult> {
    const key = decodeBase32(secret);
    if (!key || key.length === 0) {
      return { ok: false, error: 'invalidSecret' };
    }

    const counter = Math.floor(nowMs / 1000 / periodSeconds);
    const remainingSeconds =
      periodSeconds - (Math.floor(nowMs / 1000) % periodSeconds);

    const hmac = await hmacSha1(key, counterToBytes(counter));
    return {
      ok: true,
      code: truncate(hmac, digits),
      remainingSeconds,
      periodSeconds,
    };
  }
}
