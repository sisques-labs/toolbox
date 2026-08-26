export interface TextBinaryResult {
  ok: boolean;
  text?: string;
}

export class ConvertTextBinaryUseCase {
  toBinary(text: string): string {
    const bytes = new TextEncoder().encode(text);
    return [...bytes].map((b) => b.toString(2).padStart(8, '0')).join(' ');
  }

  fromBinary(binary: string): TextBinaryResult {
    const tokens = binary.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return { ok: false };
    if (tokens.some((t) => !/^[01]{1,8}$/.test(t))) return { ok: false };

    try {
      const bytes = Uint8Array.from(tokens.map((t) => parseInt(t, 2)));
      return {
        ok: true,
        text: new TextDecoder('utf-8', { fatal: true }).decode(bytes),
      };
    } catch {
      return { ok: false };
    }
  }
}
