export interface DataUrlParts {
  ok: boolean;
  mimeType?: string;
  base64?: string;
}

const DATA_URL_PATTERN = /^data:([^;]+);base64,(.*)$/s;

export class ConvertBase64FileUseCase {
  buildDataUrl(base64: string, mimeType: string): string {
    return `data:${mimeType};base64,${base64}`;
  }

  extractBase64(dataUrl: string): DataUrlParts {
    const match = dataUrl.match(DATA_URL_PATTERN);
    if (!match) return { ok: false };
    return { ok: true, mimeType: match[1], base64: match[2] };
  }
}
