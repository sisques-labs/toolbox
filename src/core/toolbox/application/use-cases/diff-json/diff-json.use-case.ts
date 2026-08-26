export type JsonDiffKind = 'added' | 'removed' | 'changed';

export interface JsonDiffChange {
  path: string;
  kind: JsonDiffKind;
  before?: unknown;
  after?: unknown;
}

export type JsonDiffResult =
  | { ok: true; changes: JsonDiffChange[] }
  | { ok: false; error: 'invalidLeft' | 'invalidRight' };

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function joinPath(base: string, key: string): string {
  return base ? `${base}.${key}` : key;
}

function collectDiffs(
  left: unknown,
  right: unknown,
  path: string,
  out: JsonDiffChange[],
): void {
  if (Object.is(left, right)) return;

  if (Array.isArray(left) && Array.isArray(right)) {
    const max = Math.max(left.length, right.length);
    for (let i = 0; i < max; i++) {
      const child = `${path}[${i}]`;
      if (i >= left.length) {
        out.push({ path: child, kind: 'added', after: right[i] });
      } else if (i >= right.length) {
        out.push({ path: child, kind: 'removed', before: left[i] });
      } else {
        collectDiffs(left[i], right[i], child, out);
      }
    }
    return;
  }

  if (isObject(left) && isObject(right)) {
    const keys = [
      ...new Set([...Object.keys(left), ...Object.keys(right)]),
    ].sort();
    for (const key of keys) {
      const child = joinPath(path, key);
      const hasLeft = Object.prototype.hasOwnProperty.call(left, key);
      const hasRight = Object.prototype.hasOwnProperty.call(right, key);
      if (!hasLeft) {
        out.push({ path: child, kind: 'added', after: right[key] });
      } else if (!hasRight) {
        out.push({ path: child, kind: 'removed', before: left[key] });
      } else {
        collectDiffs(left[key], right[key], child, out);
      }
    }
    return;
  }

  if (path === '') {
    out.push({ path: '(root)', kind: 'changed', before: left, after: right });
  } else {
    out.push({ path, kind: 'changed', before: left, after: right });
  }
}

export class DiffJsonUseCase {
  execute(leftRaw: string, rightRaw: string): JsonDiffResult {
    let left: unknown;
    let right: unknown;

    try {
      left = JSON.parse(leftRaw);
    } catch {
      return { ok: false, error: 'invalidLeft' };
    }

    try {
      right = JSON.parse(rightRaw);
    } catch {
      return { ok: false, error: 'invalidRight' };
    }

    const changes: JsonDiffChange[] = [];
    collectDiffs(left, right, '', changes);
    changes.sort((a, b) => a.path.localeCompare(b.path));
    return { ok: true, changes };
  }
}
