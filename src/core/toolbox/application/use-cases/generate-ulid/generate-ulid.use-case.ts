const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

export interface GenerateUlidDeps {
  now?: () => number;
  randomBytes?: (size: number) => Uint8Array;
}

function encodeTime(time: number): string {
  let t = time;
  let out = '';
  for (let i = 0; i < 10; i++) {
    out = ENCODING[t % 32] + out;
    t = Math.floor(t / 32);
  }
  return out;
}

function encodeRandom(bytes: Uint8Array): string {
  // 80 bits → 16 Crockford Base32 characters
  let value = 0n;
  for (const byte of bytes) {
    value = (value << 8n) | BigInt(byte);
  }

  let out = '';
  for (let i = 0; i < 16; i++) {
    out = ENCODING[Number(value & 31n)] + out;
    value >>= 5n;
  }
  return out;
}

export class GenerateUlidUseCase {
  private readonly now: () => number;
  private readonly randomBytes: (size: number) => Uint8Array;

  constructor(deps: GenerateUlidDeps = {}) {
    this.now = deps.now ?? (() => Date.now());
    this.randomBytes =
      deps.randomBytes ??
      ((size) => {
        const bytes = new Uint8Array(size);
        crypto.getRandomValues(bytes);
        return bytes;
      });
  }

  execute(count: number): string[] {
    const n = Math.max(1, Math.min(50, Math.floor(count) || 1));
    return Array.from({ length: n }, () => {
      const time = encodeTime(this.now());
      const random = encodeRandom(this.randomBytes(10));
      return time + random;
    });
  }
}
