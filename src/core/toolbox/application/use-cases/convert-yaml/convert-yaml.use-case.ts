export type YamlDirection = 'yamlToJson' | 'jsonToYaml';

type YamlValue =
  string | number | boolean | null | YamlValue[] | { [key: string]: YamlValue };

export class ConvertYamlUseCase {
  execute(input: string, direction: YamlDirection): string {
    try {
      if (direction === 'yamlToJson') {
        return JSON.stringify(this.yamlToJson(input), null, 2);
      }
      return this.jsonToYaml(JSON.parse(input));
    } catch (error) {
      return 'Could not convert: ' + (error as Error).message;
    }
  }

  private parseScalar(raw: string): YamlValue {
    const v = raw.trim();
    if (v === '') return null;
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      return v.slice(1, -1);
    }
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (v === 'null' || v === '~') return null;
    if (/^-?\d+$/.test(v)) return parseInt(v, 10);
    if (/^-?\d*\.\d+$/.test(v)) return parseFloat(v);
    if (v.startsWith('[') && v.endsWith(']')) {
      return v
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== '')
        .map((s) => this.parseScalar(s));
    }
    return v;
  }

  private yamlToJson(text: string): YamlValue {
    const rawLines = text.split('\n');
    const lines: string[] = [];
    rawLines.forEach((l) => {
      if (l.trim() !== '' && !l.trim().startsWith('#')) lines.push(l);
    });

    let result: YamlValue | undefined;
    const stack: {
      indent: number;
      container: YamlValue[] | Record<string, YamlValue>;
    }[] = [];

    lines.forEach((rawLine, idx) => {
      const indent = rawLine.match(/^ */)?.[0].length ?? 0;
      let line = rawLine.trim();
      while (stack.length && stack[stack.length - 1].indent >= indent)
        stack.pop();
      let parent = stack.length ? stack[stack.length - 1].container : null;

      if (line.startsWith('- ') || line === '-') {
        line = line === '-' ? '' : line.slice(2).trim();
        if (!parent) {
          result = result ?? [];
          parent = result as YamlValue[];
        }
        const list = parent as YamlValue[];
        const colonIdx = line.indexOf(':');
        if (colonIdx > -1 && !line.startsWith('{')) {
          const k = line.slice(0, colonIdx).trim();
          const v = line.slice(colonIdx + 1).trim();
          const obj: Record<string, YamlValue> = {};
          if (v === '') {
            const next = lines[idx + 1];
            const nextIndent = next ? (next.match(/^ */)?.[0].length ?? 0) : -1;
            obj[k] =
              nextIndent > indent && next.trim().startsWith('- ') ? [] : {};
          } else {
            obj[k] = this.parseScalar(v);
          }
          list.push(obj);
          stack.push({ indent: indent + 2, container: obj });
        } else {
          list.push(this.parseScalar(line));
        }
      } else {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return;
        const k = line.slice(0, colonIdx).trim();
        const v = line.slice(colonIdx + 1).trim();
        if (!parent) {
          result = result ?? {};
          parent = result as Record<string, YamlValue>;
        }
        const map = parent as Record<string, YamlValue>;
        if (v === '') {
          const next = lines[idx + 1];
          const nextIndent = next ? (next.match(/^ */)?.[0].length ?? 0) : -1;
          const child =
            nextIndent > indent && next.trim().startsWith('- ') ? [] : {};
          map[k] = child;
          stack.push({ indent, container: child });
        } else {
          map[k] = this.parseScalar(v);
        }
      }
    });

    return result === undefined ? {} : result;
  }

  private jsonToYaml(obj: YamlValue, indent = 0): string {
    const pad = ' '.repeat(indent);
    if (obj === null || obj === undefined) return 'null';
    if (typeof obj !== 'object') {
      return typeof obj === 'string'
        ? /^[\w.\- ]*$/.test(obj)
          ? obj
          : JSON.stringify(obj)
        : String(obj);
    }
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      return obj
        .map((item) => {
          if (item && typeof item === 'object' && Object.keys(item).length) {
            const inner = this.jsonToYaml(item, indent + 2);
            const l = inner.split('\n');
            return (
              pad +
              '- ' +
              l[0].trimStart() +
              (l.length > 1 ? '\n' + l.slice(1).join('\n') : '')
            );
          }
          return pad + '- ' + this.jsonToYaml(item, 0);
        })
        .join('\n');
    }
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    return keys
      .map((k) => {
        const v = obj[k];
        if (
          v &&
          typeof v === 'object' &&
          (Array.isArray(v) ? v.length : Object.keys(v).length)
        ) {
          return pad + k + ':\n' + this.jsonToYaml(v, indent + 2);
        }
        return pad + k + ': ' + this.jsonToYaml(v, 0);
      })
      .join('\n');
  }
}
