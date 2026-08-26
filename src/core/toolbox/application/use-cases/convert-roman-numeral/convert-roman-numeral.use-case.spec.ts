import { ConvertRomanNumeralUseCase } from './convert-roman-numeral.use-case';

describe('ConvertRomanNumeralUseCase', () => {
  const useCase = new ConvertRomanNumeralUseCase();

  it('converts an arabic number to a roman numeral', () => {
    expect(useCase.execute('1994')).toEqual({
      ok: true,
      arabic: 1994,
      roman: 'MCMXCIV',
    });
  });

  it('converts a roman numeral to an arabic number', () => {
    expect(useCase.execute('MCMXCIV')).toEqual({
      ok: true,
      arabic: 1994,
      roman: 'MCMXCIV',
    });
  });

  it('is case-insensitive for roman numeral input', () => {
    expect(useCase.execute('mcmxciv')).toEqual({
      ok: true,
      arabic: 1994,
      roman: 'MCMXCIV',
    });
  });

  it('rejects a non-canonical roman numeral like IIII', () => {
    expect(useCase.execute('IIII')).toEqual({ ok: false });
  });

  it('rejects numbers out of the 1-3999 range', () => {
    expect(useCase.execute('0')).toEqual({ ok: false });
    expect(useCase.execute('4000')).toEqual({ ok: false });
  });

  it('rejects gibberish input', () => {
    expect(useCase.execute('ABC')).toEqual({ ok: false });
  });

  it('rejects empty input', () => {
    expect(useCase.execute('')).toEqual({ ok: false });
  });
});
