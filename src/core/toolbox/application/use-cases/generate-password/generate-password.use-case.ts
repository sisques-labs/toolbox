export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export type PasswordStrength = 'weak' | 'fair' | 'strong' | 'veryStrong';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{}';

export class GeneratePasswordUseCase {
  execute(options: PasswordOptions): string {
    const chars = this.charset(options);
    const values = new Uint32Array(options.length);
    crypto.getRandomValues(values);
    return Array.from(values, (n) => chars[n % chars.length]).join('');
  }

  strength(options: PasswordOptions): PasswordStrength {
    const poolSize = this.poolSize(options);
    const entropy = options.length * Math.log2(poolSize);

    if (entropy >= 90) return 'veryStrong';
    if (entropy >= 60) return 'strong';
    if (entropy >= 36) return 'fair';
    return 'weak';
  }

  private charset(options: PasswordOptions): string {
    let chars = '';
    if (options.lowercase) chars += LOWERCASE;
    if (options.uppercase) chars += UPPERCASE;
    if (options.numbers) chars += NUMBERS;
    if (options.symbols) chars += SYMBOLS;
    return chars || LOWERCASE;
  }

  private poolSize(options: PasswordOptions): number {
    const size =
      (options.uppercase ? UPPERCASE.length : 0) +
      (options.lowercase ? LOWERCASE.length : 0) +
      (options.numbers ? NUMBERS.length : 0) +
      (options.symbols ? SYMBOLS.length : 0);
    return size || LOWERCASE.length;
  }
}
