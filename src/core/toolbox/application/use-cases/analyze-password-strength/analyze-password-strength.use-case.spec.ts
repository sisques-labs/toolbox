import { AnalyzePasswordStrengthUseCase } from './analyze-password-strength.use-case';

describe('AnalyzePasswordStrengthUseCase', () => {
  const useCase = new AnalyzePasswordStrengthUseCase();

  it('rates an empty password as weak with zero entropy', () => {
    const result = useCase.execute('');
    expect(result.entropyBits).toBe(0);
    expect(result.strength).toBe('weak');
  });

  it('rates a short lowercase-only password as weak', () => {
    const result = useCase.execute('abcd');
    expect(result.strength).toBe('weak');
  });

  it('rates a long password mixing cases, digits and symbols as very strong', () => {
    const result = useCase.execute('Tr0ub4dor&3-XyZ!qw');
    expect(result.strength).toBe('veryStrong');
  });

  it('increases entropy as the character pool and length grow', () => {
    const shortLower = useCase.execute('abcdef');
    const longerMixed = useCase.execute('abcDEF123!@#');
    expect(longerMixed.entropyBits).toBeGreaterThan(shortLower.entropyBits);
  });

  it('estimates a longer crack time for a stronger password', () => {
    const weak = useCase.execute('abcd');
    const strong = useCase.execute('Tr0ub4dor&3-XyZ!qw');
    expect(strong.crackTimeSeconds).toBeGreaterThan(weak.crackTimeSeconds);
  });
});
