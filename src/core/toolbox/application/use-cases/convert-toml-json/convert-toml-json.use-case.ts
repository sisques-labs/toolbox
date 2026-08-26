export interface TomlJsonResult {
  ok: boolean;
  json?: string;
}

export interface JsonTomlResult {
  ok: boolean;
  toml?: string;
}

type TomlValue = string | number | boolean | TomlValue[];
type TomlTable = { [key: string]: TomlValue | TomlTable };

function parseValue(raw: string): TomlValue | null {
  const trimmed = raw.trim();

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed
      .slice(1, -1)
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    const items = inner.split(',').map((item) => parseValue(item));
    if (items.some((item) => item === null)) return null;
    return items as TomlValue[];
  }
  return null;
}

function stringifyValue(value: TomlValue): string {
  if (typeof value === 'string') {
    return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  if (Array.isArray(value)) {
    return `[${value.map(stringifyValue).join(', ')}]`;
  }
  return String(value);
}

export class ConvertTomlJsonUseCase {
  tomlToJson(toml: string): TomlJsonResult {
    const root: TomlTable = {};
    let current: TomlTable = root;

    for (const rawLine of toml.split('\n')) {
      const line = rawLine.trim();
      if (line === '' || line.startsWith('#')) continue;

      const tableMatch = line.match(/^\[([\w.-]+)]$/);
      if (tableMatch) {
        const table: TomlTable = {};
        root[tableMatch[1]] = table;
        current = table;
        continue;
      }

      const kvMatch = line.match(/^([\w.-]+)\s*=\s*(.+)$/);
      if (!kvMatch) return { ok: false };

      const value = parseValue(kvMatch[2]);
      if (value === null) return { ok: false };
      current[kvMatch[1]] = value;
    }

    return { ok: true, json: JSON.stringify(root, null, 2) };
  }

  jsonToToml(json: string): JsonTomlResult {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      return { ok: false };
    }
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return { ok: false };
    }

    const obj = parsed as Record<string, unknown>;
    const rootLines: string[] = [];
    const tableBlocks: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const tableLines = Object.entries(value as Record<string, unknown>).map(
          ([k, v]) => `${k} = ${stringifyValue(v as TomlValue)}`,
        );
        tableBlocks.push(`[${key}]\n${tableLines.join('\n')}`);
      } else {
        rootLines.push(`${key} = ${stringifyValue(value as TomlValue)}`);
      }
    }

    const sections = [rootLines.join('\n'), ...tableBlocks].filter(Boolean);
    return { ok: true, toml: sections.join('\n\n') };
  }
}
