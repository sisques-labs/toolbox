export interface XmlFormatResult {
  ok: boolean;
  formatted?: string;
}

function isWellFormed(xml: string): boolean {
  // codeql[js/xss-through-dom] Parsed as application/xml for validation only; the
  // Document is discarded here and never inserted into the live DOM.
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  return doc.getElementsByTagName('parsererror').length === 0;
}

function tokenize(xml: string): string[] {
  return xml
    .trim()
    .replace(/>\s*</g, '><')
    .split(/(?<=>)(?=<)/);
}

export class FormatXmlUseCase {
  format(xml: string, indentSize: number): XmlFormatResult {
    if (!xml.trim() || !isWellFormed(xml)) return { ok: false };

    const indent = ' '.repeat(indentSize);
    let depth = 0;
    const lines: string[] = [];

    for (const token of tokenize(xml)) {
      const isClosing = /^<\//.test(token);
      const isSelfClosing = /\/>$/.test(token);
      const isDeclOrComment =
        /^<\?/.test(token) || /^<!--[\s\S]*-->$/.test(token);
      const isSelfContained = /^<([\w:.-]+)(?:\s[^>]*)?>.*<\/\1>$/.test(token);

      if (isClosing) depth = Math.max(0, depth - 1);

      lines.push(`${indent.repeat(depth)}${token}`);

      const opensNewLevel =
        !isClosing && !isSelfClosing && !isDeclOrComment && !isSelfContained;
      if (opensNewLevel) depth++;
    }

    return { ok: true, formatted: lines.join('\n') };
  }

  minify(xml: string): XmlFormatResult {
    if (!xml.trim() || !isWellFormed(xml)) return { ok: false };
    return { ok: true, formatted: xml.trim().replace(/>\s+</g, '><') };
  }
}
