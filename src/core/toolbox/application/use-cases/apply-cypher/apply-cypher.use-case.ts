const ALPHABET_SIZE = 26;

function normalizeShift(shift: number): number {
  return ((shift % ALPHABET_SIZE) + ALPHABET_SIZE) % ALPHABET_SIZE;
}

export class ApplyCypherUseCase {
  execute(text: string, shift: number): string {
    const normalized = normalizeShift(shift);

    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= 'Z' ? 65 : 97;
      const code = char.charCodeAt(0) - base;
      return String.fromCharCode(((code + normalized) % 26) + base);
    });
  }
}
