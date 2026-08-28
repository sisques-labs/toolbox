export type JsonIndent = '2' | '4' | 'tab';

export interface JsonFormatResult {
  ok: boolean;
  text: string;
}

export class FormatJsonUseCase {
  execute(input: string, indent: JsonIndent): JsonFormatResult {
    try {
      const parsed = JSON.parse(input);
      const space = indent === 'tab' ? '\t' : Number(indent);
      return { ok: true, text: JSON.stringify(parsed, null, space) };
    } catch (error) {
      return { ok: false, text: (error as Error).message };
    }
  }

  minify(input: string): string {
    try {
      return JSON.stringify(JSON.parse(input));
    } catch {
      return input;
    }
  }
}
