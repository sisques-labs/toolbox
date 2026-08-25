import { GeneratePasswordUseCase } from './generate-password.use-case';

describe('GeneratePasswordUseCase', () => {
  const useCase = new GeneratePasswordUseCase();

  it('generates a password of the requested length using only the selected character sets', () => {
    const result = useCase.execute({
      length: 24,
      uppercase: false,
      lowercase: true,
      numbers: true,
      symbols: false,
    });

    expect(result).toHaveLength(24);
    expect(result).toMatch(/^[a-z0-9]+$/);
  });

  it('falls back to lowercase letters when no character set is selected', () => {
    const result = useCase.execute({
      length: 12,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    });

    expect(result).toHaveLength(12);
    expect(result).toMatch(/^[a-z]+$/);
  });

  it('rates a short, single-charset password as weak', () => {
    const strength = useCase.strength({
      length: 6,
      uppercase: false,
      lowercase: true,
      numbers: false,
      symbols: false,
    });

    expect(strength).toBe('weak');
  });

  it('rates a long, full-charset password as very strong', () => {
    const strength = useCase.strength({
      length: 32,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    });

    expect(strength).toBe('veryStrong');
  });
});
