import { ParsePhoneUseCase } from './parse-phone.use-case';

describe('ParsePhoneUseCase', () => {
  const useCase = new ParsePhoneUseCase();

  it('parses a Spanish number with spaces into its parts', () => {
    expect(useCase.execute('+34 612 345 678')).toEqual({
      ok: true,
      dialCode: '34',
      countryName: 'Spain',
      nationalNumber: '612345678',
      formatted: '+34 612 345 678',
    });
  });

  it('parses a US number written with dashes and parens', () => {
    expect(useCase.execute('+1 (415) 555-2671')).toEqual({
      ok: true,
      dialCode: '1',
      countryName: 'United States / Canada',
      nationalNumber: '4155552671',
      formatted: '+1 415 555 267 1',
    });
  });

  it('rejects a number without a leading +', () => {
    expect(useCase.execute('612345678').ok).toBe(false);
  });

  it('rejects an unrecognized dial code', () => {
    expect(useCase.execute('+999123456').ok).toBe(false);
  });
});
