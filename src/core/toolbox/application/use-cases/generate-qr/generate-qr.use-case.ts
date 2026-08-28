import { renderSVG } from 'uqr';

export type QrResult =
  { ok: true; svg: string } | { ok: false; error: 'empty' };

export class GenerateQrUseCase {
  execute(text: string): QrResult {
    const trimmed = text.trim();
    if (!trimmed) return { ok: false, error: 'empty' };

    return { ok: true, svg: renderSVG(trimmed) };
  }
}
