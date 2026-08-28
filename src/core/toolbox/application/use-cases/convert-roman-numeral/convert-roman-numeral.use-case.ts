export interface RomanResult {
  ok: boolean;
  arabic?: number;
  roman?: string;
}

const NUMERALS: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

const ROMAN_VALUES: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

function toRoman(n: number): string {
  let result = '';
  let remaining = n;
  for (const [value, symbol] of NUMERALS) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

function fromRoman(roman: string): number | null {
  const upper = roman.toUpperCase();
  if (!/^[IVXLCDM]+$/.test(upper)) return null;

  let total = 0;
  for (let i = 0; i < upper.length; i++) {
    const current = ROMAN_VALUES[upper[i]];
    const next = ROMAN_VALUES[upper[i + 1]];
    total += next && current < next ? -current : current;
  }

  return toRoman(total) === upper ? total : null;
}

export class ConvertRomanNumeralUseCase {
  execute(input: string): RomanResult {
    const trimmed = input.trim();
    if (!trimmed) return { ok: false };

    if (/^\d+$/.test(trimmed)) {
      const n = Number(trimmed);
      if (n < 1 || n > 3999) return { ok: false };
      return { ok: true, arabic: n, roman: toRoman(n) };
    }

    const n = fromRoman(trimmed);
    if (n === null) return { ok: false };
    return { ok: true, arabic: n, roman: toRoman(n) };
  }
}
