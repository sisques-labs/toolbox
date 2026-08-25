export type HtmlMode = 'escape' | 'unescape';

export interface HtmlResult {
  ok: boolean;
  text: string;
}

const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const UNESCAPE_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
};

export class ConvertHtmlUseCase {
  execute(input: string, mode: HtmlMode): HtmlResult {
    if (mode === 'escape') {
      return {
        ok: true,
        text: input.replace(/[&<>"']/g, (char) => ESCAPE_MAP[char]),
      };
    }

    return {
      ok: true,
      text: input.replace(
        /&(?:amp|lt|gt|quot|apos|#39);/g,
        (entity) => UNESCAPE_MAP[entity] ?? entity,
      ),
    };
  }
}
