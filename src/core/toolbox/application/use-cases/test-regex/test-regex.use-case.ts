export interface RegexMatch {
  value: string;
  index: number;
  groups: string[];
}

export type RegexResult =
  { ok: true; matches: RegexMatch[] } | { ok: false; error: 'invalid' };

const ALLOWED_FLAGS = new Set(['g', 'i', 'm', 's', 'u', 'y', 'd']);

export class TestRegexUseCase {
  execute({
    pattern,
    flags,
    text,
  }: {
    pattern: string;
    flags: string;
    text: string;
  }): RegexResult {
    const uniqueFlags = [...new Set(flags.split('').filter(Boolean))];
    if (uniqueFlags.some((flag) => !ALLOWED_FLAGS.has(flag))) {
      return { ok: false, error: 'invalid' };
    }

    let regex: RegExp;
    try {
      regex = new RegExp(pattern, uniqueFlags.join(''));
    } catch {
      return { ok: false, error: 'invalid' };
    }

    const matches: RegexMatch[] = [];

    if (regex.global) {
      for (const match of text.matchAll(regex)) {
        matches.push({
          value: match[0],
          index: match.index ?? 0,
          groups: match.slice(1).map((g) => g ?? ''),
        });
      }
    } else {
      const match = regex.exec(text);
      if (match) {
        matches.push({
          value: match[0],
          index: match.index,
          groups: match.slice(1).map((g) => g ?? ''),
        });
      }
    }

    return { ok: true, matches };
  }
}
