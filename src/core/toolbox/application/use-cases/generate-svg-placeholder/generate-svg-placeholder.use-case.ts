export interface SvgPlaceholderOptions {
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  text: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export class GenerateSvgPlaceholderUseCase {
  execute({
    width,
    height,
    backgroundColor,
    textColor,
    text,
  }: SvgPlaceholderOptions): string {
    const label = escapeXml(text.trim() || `${width}×${height}`);
    const fontSize = Math.max(12, Math.round(Math.min(width, height) / 8));

    return [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
      `<rect width="${width}" height="${height}" fill="${backgroundColor}" />`,
      `<text x="50%" y="50%" fill="${textColor}" font-family="sans-serif" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">${label}</text>`,
      `</svg>`,
    ].join('');
  }
}
