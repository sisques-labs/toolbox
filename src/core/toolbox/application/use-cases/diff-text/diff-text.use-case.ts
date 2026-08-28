export type TextDiffKind = 'equal' | 'added' | 'removed';

export interface TextDiffLine {
  kind: TextDiffKind;
  text: string;
}

export interface TextDiffResult {
  lines: TextDiffLine[];
}

function splitLines(text: string): string[] {
  if (text === '') return [];
  return text.split(/\r?\n/);
}

/** Myers-inspired LCS backtrack for line-level diffs. */
function diffLines(left: string[], right: string[]): TextDiffLine[] {
  const n = left.length;
  const m = right.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array.from({ length: m + 1 }, () => 0),
  );

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] =
        left[i] === right[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const lines: TextDiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (left[i] === right[j]) {
      lines.push({ kind: 'equal', text: left[i] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      lines.push({ kind: 'removed', text: left[i] });
      i += 1;
    } else {
      lines.push({ kind: 'added', text: right[j] });
      j += 1;
    }
  }
  while (i < n) {
    lines.push({ kind: 'removed', text: left[i] });
    i += 1;
  }
  while (j < m) {
    lines.push({ kind: 'added', text: right[j] });
    j += 1;
  }
  return lines;
}

export class DiffTextUseCase {
  execute(left: string, right: string): TextDiffResult {
    return {
      lines: diffLines(splitLines(left), splitLines(right)),
    };
  }
}
