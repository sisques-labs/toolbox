function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

export class ConvertMarkdownHtmlUseCase {
  execute(markdown: string): string {
    const lines = markdown.split('\n');
    const output: string[] = [];
    let listItems: string[] = [];
    let paragraph: string[] = [];

    function flushList() {
      if (listItems.length === 0) return;
      output.push('<ul>', ...listItems.map((i) => `<li>${i}</li>`), '</ul>');
      listItems = [];
    }

    function flushParagraph() {
      if (paragraph.length === 0) return;
      output.push(`<p>${paragraph.join(' ')}</p>`);
      paragraph = [];
    }

    for (const rawLine of lines) {
      const line = rawLine.trim();
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      const listMatch = line.match(/^-\s+(.*)$/);

      if (headingMatch) {
        flushList();
        flushParagraph();
        const level = headingMatch[1].length;
        output.push(
          `<h${level}>${applyInline(escapeHtml(headingMatch[2]))}</h${level}>`,
        );
      } else if (listMatch) {
        flushParagraph();
        listItems.push(applyInline(escapeHtml(listMatch[1])));
      } else if (line === '') {
        flushList();
        flushParagraph();
      } else {
        flushList();
        paragraph.push(applyInline(escapeHtml(line)));
      }
    }

    flushList();
    flushParagraph();

    return output.join('\n');
  }
}
