export type JsonCsvDirection = 'jsonToCsv' | 'csvToJson';

export interface JsonCsvResult {
  ok: boolean;
  output?: string;
}

function escapeCsvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += char;
      i++;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (char === ',') {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i++;
      continue;
    }
    field += char;
    i++;
  }
  row.push(field);
  rows.push(row);

  return rows.filter(
    (r, idx) => !(idx === rows.length - 1 && r.length === 1 && r[0] === ''),
  );
}

function jsonToCsv(input: string): JsonCsvResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    return { ok: false };
  }
  if (
    !Array.isArray(parsed) ||
    parsed.length === 0 ||
    !parsed.every(
      (item) =>
        item !== null && typeof item === 'object' && !Array.isArray(item),
    )
  ) {
    return { ok: false };
  }

  const rows = parsed as Record<string, unknown>[];
  const keys: string[] = [];
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!keys.includes(key)) keys.push(key);
    }
  }

  const lines = [keys.map(escapeCsvField).join(',')];
  for (const row of rows) {
    lines.push(
      keys
        .map((key) => {
          const value = row[key];
          return escapeCsvField(
            value === undefined || value === null ? '' : String(value),
          );
        })
        .join(','),
    );
  }

  return { ok: true, output: lines.join('\n') };
}

function csvToJson(input: string): JsonCsvResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false };

  const [header, ...dataRows] = parseCsv(trimmed);
  const objects = dataRows.map((row) =>
    Object.fromEntries(header.map((key, i) => [key, row[i] ?? ''])),
  );

  return { ok: true, output: JSON.stringify(objects, null, 2) };
}

export class ConvertJsonCsvUseCase {
  execute(input: string, direction: JsonCsvDirection): JsonCsvResult {
    return direction === 'jsonToCsv' ? jsonToCsv(input) : csvToJson(input);
  }
}
