export type Base64Mode = 'encode' | 'decode';

export interface Base64Result {
  ok: boolean;
  text: string;
}

export class ConvertBase64UseCase {
  execute(input: string, mode: Base64Mode): Base64Result {
    try {
      if (mode === 'encode') {
        return { ok: true, text: btoa(unescape(encodeURIComponent(input))) };
      }
      return {
        ok: true,
        text: decodeURIComponent(escape(atob(input.trim()))),
      };
    } catch {
      return { ok: false, text: 'Invalid input for this mode' };
    }
  }
}
