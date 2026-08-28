export interface SafelinkResult {
  ok: boolean;
  url?: string;
}

const WRAPPER_PARAMS = ['url', 'q'];

export class DecodeSafelinkUseCase {
  execute(link: string): SafelinkResult {
    try {
      const parsed = new URL(link);
      for (const param of WRAPPER_PARAMS) {
        const value = parsed.searchParams.get(param);
        if (value) return { ok: true, url: value };
      }
      return { ok: false };
    } catch {
      return { ok: false };
    }
  }
}
