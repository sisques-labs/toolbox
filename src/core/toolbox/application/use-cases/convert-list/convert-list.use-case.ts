export interface ListConvertOptions {
  sort: 'none' | 'asc' | 'desc';
  unique: boolean;
  removeEmpty: boolean;
  prefix: string;
  suffix: string;
}

export class ConvertListUseCase {
  execute(input: string, options: ListConvertOptions): string {
    let lines = input.split('\n').map((line) => line.trim());

    if (options.removeEmpty) lines = lines.filter((line) => line !== '');
    if (options.unique) lines = [...new Set(lines)];
    if (options.sort === 'asc') lines = [...lines].sort();
    if (options.sort === 'desc') lines = [...lines].sort().reverse();

    return lines
      .map((line) => `${options.prefix}${line}${options.suffix}`)
      .join('\n');
  }
}
