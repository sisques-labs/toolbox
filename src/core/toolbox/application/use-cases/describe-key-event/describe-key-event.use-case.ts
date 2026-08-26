export interface KeyEventInput {
  key: string;
  code: string;
  keyCode: number;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

export interface KeyEventDescription {
  key: string;
  code: string;
  keyCode: number;
  modifiers: string[];
}

export class DescribeKeyEventUseCase {
  execute(input: KeyEventInput): KeyEventDescription {
    const modifiers: string[] = [];
    if (input.ctrlKey) modifiers.push('Ctrl');
    if (input.altKey) modifiers.push('Alt');
    if (input.shiftKey) modifiers.push('Shift');
    if (input.metaKey) modifiers.push('Meta');

    return {
      key: input.key,
      code: input.code,
      keyCode: input.keyCode,
      modifiers,
    };
  }
}
