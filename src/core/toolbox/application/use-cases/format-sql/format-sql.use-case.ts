const TOP_LEVEL_KEYWORDS = [
  'LEFT JOIN',
  'RIGHT JOIN',
  'INNER JOIN',
  'OUTER JOIN',
  'GROUP BY',
  'ORDER BY',
  'INSERT INTO',
  'DELETE FROM',
  'UNION ALL',
  'SELECT',
  'FROM',
  'WHERE',
  'JOIN',
  'HAVING',
  'LIMIT',
  'SET',
  'VALUES',
  'UNION',
  'UPDATE',
];

const INDENTED_KEYWORDS = ['AND', 'OR'];

const ALL_KEYWORDS = [...TOP_LEVEL_KEYWORDS, ...INDENTED_KEYWORDS];

const KEYWORD_PATTERN = new RegExp(`\\b(${ALL_KEYWORDS.join('|')})\\b`, 'gi');

function splitTopLevelCommas(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';

  for (const char of text) {
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (char === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

export class FormatSqlUseCase {
  execute(sql: string): string {
    const normalized = sql
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\bon\b/gi, 'ON')
      .replace(/\bas\b/gi, 'AS');
    if (!normalized) return '';

    const segments: { keyword: string; text: string }[] = [];
    let lastIndex = 0;
    let lastKeyword = '';
    let match: RegExpExecArray | null;

    KEYWORD_PATTERN.lastIndex = 0;
    while ((match = KEYWORD_PATTERN.exec(normalized))) {
      if (match.index > lastIndex) {
        segments.push({
          keyword: lastKeyword,
          text: normalized.slice(lastIndex, match.index).trim(),
        });
      }
      lastKeyword = match[1].toUpperCase();
      lastIndex = KEYWORD_PATTERN.lastIndex;
    }
    segments.push({
      keyword: lastKeyword,
      text: normalized.slice(lastIndex).trim(),
    });

    const lines: string[] = [];
    for (const { keyword, text } of segments) {
      if (!keyword) {
        if (text) lines.push(text);
        continue;
      }

      const indented = INDENTED_KEYWORDS.includes(keyword);
      const prefix = indented ? '  ' : '';

      if (keyword === 'SELECT') {
        const columns = splitTopLevelCommas(text);
        const withCommas = columns.map(
          (column, i) => column + (i < columns.length - 1 ? ',' : ''),
        );
        lines.push(`SELECT ${withCommas[0]}`);
        for (const column of withCommas.slice(1)) {
          lines.push(`  ${column}`);
        }
      } else {
        lines.push(`${prefix}${keyword}${text ? ` ${text}` : ''}`);
      }
    }

    return lines.join('\n');
  }
}
