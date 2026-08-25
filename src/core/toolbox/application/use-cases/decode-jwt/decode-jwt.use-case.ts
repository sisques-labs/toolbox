export interface JwtDecodeResult {
  ok: boolean;
  header?: string;
  payload?: string;
  signature?: string;
  error?: string;
}

export class DecodeJwtUseCase {
  execute(token: string): JwtDecodeResult {
    const parts = token.trim().split('.');
    if (parts.length < 2) {
      return {
        ok: false,
        error: 'Not a valid JWT — expected 3 dot-separated parts.',
      };
    }
    try {
      const header = JSON.parse(this.base64UrlDecode(parts[0]));
      const payload = JSON.parse(this.base64UrlDecode(parts[1]));
      return {
        ok: true,
        header: JSON.stringify(header, null, 2),
        payload: JSON.stringify(payload, null, 2),
        signature: parts[2] || '',
      };
    } catch {
      return { ok: false, error: 'Could not decode this token.' };
    }
  }

  private base64UrlDecode(segment: string): string {
    let s = segment.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return decodeURIComponent(escape(atob(s)));
  }
}
