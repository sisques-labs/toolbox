export type BaseConvertResult =
  | {
      ok: true;
      decimal: string;
      binary: string;
      octal: string;
      hex: string;
    }
  | { ok: false; error: 'invalid' };

export class ConvertBaseUseCase {
  execute(input: string, fromBase: number): BaseConvertResult {
    const trimmed = input.trim().replace(/^0x/i, '');
    if (!trimmed || fromBase < 2 || fromBase > 36) {
      return { ok: false, error: 'invalid' };
    }

    try {
      const value = BigInt(parseIntSafe(trimmed, fromBase));
      return {
        ok: true,
        decimal: value.toString(10),
        binary: value.toString(2),
        octal: value.toString(8),
        hex: value.toString(16).toUpperCase(),
      };
    } catch {
      return { ok: false, error: 'invalid' };
    }
  }
}

function parseIntSafe(input: string, base: number): bigint {
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
  let value = 0n;
  for (const char of input.toLowerCase()) {
    const digit = BigInt(alphabet.indexOf(char));
    if (digit < 0n || digit >= BigInt(base)) {
      throw new Error('invalid digit');
    }
    value = value * BigInt(base) + digit;
  }
  return value;
}
