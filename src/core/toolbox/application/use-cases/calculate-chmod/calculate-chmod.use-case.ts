export interface PermissionFlags {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface ChmodFlags {
  owner: PermissionFlags;
  group: PermissionFlags;
  other: PermissionFlags;
}

export interface ChmodResult {
  octal: string;
  symbolic: string;
  flags: ChmodFlags;
}

export type ChmodParseResult =
  ({ ok: true } & ChmodResult) | { ok: false; error: 'invalid' };

function tripletValue(flags: PermissionFlags): number {
  return (flags.read ? 4 : 0) + (flags.write ? 2 : 0) + (flags.execute ? 1 : 0);
}

function tripletSymbolic(flags: PermissionFlags): string {
  return `${flags.read ? 'r' : '-'}${flags.write ? 'w' : '-'}${flags.execute ? 'x' : '-'}`;
}

function flagsFromDigit(digit: number): PermissionFlags {
  return {
    read: (digit & 4) !== 0,
    write: (digit & 2) !== 0,
    execute: (digit & 1) !== 0,
  };
}

export class CalculateChmodUseCase {
  fromFlags(flags: ChmodFlags): ChmodResult {
    const octal = `${tripletValue(flags.owner)}${tripletValue(flags.group)}${tripletValue(flags.other)}`;
    const symbolic = `${tripletSymbolic(flags.owner)}${tripletSymbolic(flags.group)}${tripletSymbolic(flags.other)}`;
    return { octal, symbolic, flags };
  }

  fromOctal(octal: string): ChmodParseResult {
    const trimmed = octal.trim();
    if (!/^[0-7]{3}$/.test(trimmed)) {
      return { ok: false, error: 'invalid' };
    }

    const flags: ChmodFlags = {
      owner: flagsFromDigit(Number(trimmed[0])),
      group: flagsFromDigit(Number(trimmed[1])),
      other: flagsFromDigit(Number(trimmed[2])),
    };

    return { ok: true, ...this.fromFlags(flags) };
  }
}
