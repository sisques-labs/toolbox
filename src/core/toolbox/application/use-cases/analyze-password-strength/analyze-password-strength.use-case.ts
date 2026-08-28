export type PasswordStrength = 'weak' | 'fair' | 'strong' | 'veryStrong';

export interface PasswordStrengthResult {
  entropyBits: number;
  strength: PasswordStrength;
  crackTimeSeconds: number;
}

const GUESSES_PER_SECOND = 1e10;

function poolSize(password: string): number {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26;
  if (/[A-Z]/.test(password)) size += 26;
  if (/[0-9]/.test(password)) size += 10;
  if (/[^a-zA-Z0-9]/.test(password)) size += 33;
  return size;
}

function strengthFor(entropyBits: number): PasswordStrength {
  if (entropyBits < 40) return 'weak';
  if (entropyBits < 60) return 'fair';
  if (entropyBits < 80) return 'strong';
  return 'veryStrong';
}

export class AnalyzePasswordStrengthUseCase {
  execute(password: string): PasswordStrengthResult {
    if (!password) {
      return { entropyBits: 0, strength: 'weak', crackTimeSeconds: 0 };
    }

    const size = poolSize(password);
    const entropyBits = password.length * Math.log2(size);
    const crackTimeSeconds = Math.pow(2, entropyBits) / GUESSES_PER_SECOND;

    return {
      entropyBits,
      strength: strengthFor(entropyBits),
      crackTimeSeconds,
    };
  }
}
