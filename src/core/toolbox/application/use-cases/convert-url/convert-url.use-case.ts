export type UrlMode = 'encode' | 'decode';

export interface UrlResult {
  ok: boolean;
  text: string;
}

export class ConvertUrlUseCase {
  execute(input: string, mode: UrlMode): UrlResult {
    try {
      if (mode === 'encode') {
        return { ok: true, text: encodeURIComponent(input) };
      }
      return { ok: true, text: decodeURIComponent(input.trim()) };
    } catch {
      return { ok: false, text: 'Invalid input for this mode' };
    }
  }
}
