import { ObfuscateStringUseCase } from './obfuscate-string.use-case';

describe('ObfuscateStringUseCase', () => {
  const useCase = new ObfuscateStringUseCase();

  it('masks the middle of a string, keeping the visible start and end', () => {
    expect(
      useCase.execute('4242424242424242', {
        visibleStart: 4,
        visibleEnd: 4,
        maskChar: '*',
      }),
    ).toBe('4242********4242');
  });

  it('uses a custom mask character', () => {
    expect(
      useCase.execute('secret123', {
        visibleStart: 2,
        visibleEnd: 2,
        maskChar: '#',
      }),
    ).toBe('se#####23');
  });

  it('leaves the string unchanged when it is too short to mask', () => {
    expect(
      useCase.execute('ab', { visibleStart: 2, visibleEnd: 2, maskChar: '*' }),
    ).toBe('ab');
  });
});
