import { ConvertBaseUseCase } from './convert-base.use-case';

describe('ConvertBaseUseCase', () => {
  const useCase = new ConvertBaseUseCase();

  it('converts decimal to common bases', () => {
    expect(useCase.execute('255', 10)).toEqual({
      ok: true,
      decimal: '255',
      binary: '11111111',
      octal: '377',
      hex: 'FF',
    });
  });

  it('accepts hex input', () => {
    expect(useCase.execute('ff', 16)).toEqual({
      ok: true,
      decimal: '255',
      binary: '11111111',
      octal: '377',
      hex: 'FF',
    });
  });

  it('rejects invalid digits for the source base', () => {
    expect(useCase.execute('2', 2)).toEqual({ ok: false, error: 'invalid' });
  });

  it('rejects empty input', () => {
    expect(useCase.execute('  ', 10)).toEqual({ ok: false, error: 'invalid' });
  });
});
