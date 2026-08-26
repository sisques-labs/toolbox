export interface BasicAuthDecodeResult {
  ok: boolean;
  username?: string;
  password?: string;
}

export class GenerateBasicAuthUseCase {
  encode(username: string, password: string): string {
    return `Basic ${btoa(`${username}:${password}`)}`;
  }

  decode(header: string): BasicAuthDecodeResult {
    const token = header.replace(/^Basic\s+/i, '').trim();
    try {
      const decoded = atob(token);
      const separatorIndex = decoded.indexOf(':');
      if (separatorIndex === -1) return { ok: false };
      return {
        ok: true,
        username: decoded.slice(0, separatorIndex),
        password: decoded.slice(separatorIndex + 1),
      };
    } catch {
      return { ok: false };
    }
  }
}
