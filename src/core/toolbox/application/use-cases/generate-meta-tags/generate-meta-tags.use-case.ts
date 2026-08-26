export interface MetaTagsOptions {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class GenerateMetaTagsUseCase {
  execute({ title, description, imageUrl, url }: MetaTagsOptions): string {
    const lines: string[] = [];
    const safeTitle = escapeHtml(title.trim());
    const safeDescription = escapeHtml(description.trim());
    const safeImageUrl = escapeHtml(imageUrl.trim());
    const safeUrl = escapeHtml(url.trim());

    if (safeTitle) lines.push(`<title>${safeTitle}</title>`);
    if (safeDescription) {
      lines.push(`<meta name="description" content="${safeDescription}" />`);
    }

    if (safeTitle) {
      lines.push(`<meta property="og:title" content="${safeTitle}" />`);
    }
    if (safeDescription) {
      lines.push(
        `<meta property="og:description" content="${safeDescription}" />`,
      );
    }
    if (safeImageUrl) {
      lines.push(`<meta property="og:image" content="${safeImageUrl}" />`);
    }
    if (safeUrl) {
      lines.push(`<meta property="og:url" content="${safeUrl}" />`);
    }

    if (safeTitle || safeDescription || safeImageUrl) {
      lines.push('<meta name="twitter:card" content="summary_large_image" />');
      if (safeTitle) {
        lines.push(`<meta name="twitter:title" content="${safeTitle}" />`);
      }
      if (safeDescription) {
        lines.push(
          `<meta name="twitter:description" content="${safeDescription}" />`,
        );
      }
      if (safeImageUrl) {
        lines.push(`<meta name="twitter:image" content="${safeImageUrl}" />`);
      }
    }

    return lines.join('\n');
  }
}
