export interface ObfuscateOptions {
  visibleStart: number;
  visibleEnd: number;
  maskChar: string;
}

export class ObfuscateStringUseCase {
  execute(
    text: string,
    { visibleStart, visibleEnd, maskChar }: ObfuscateOptions,
  ): string {
    if (text.length <= visibleStart + visibleEnd) return text;

    const maskLength = text.length - visibleStart - visibleEnd;
    const mask = (maskChar || '*').charAt(0).repeat(maskLength);
    return `${text.slice(0, visibleStart)}${mask}${text.slice(text.length - visibleEnd)}`;
  }
}
