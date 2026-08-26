import { ValidateIbanUseCase } from './validate-iban.use-case';

describe('ValidateIbanUseCase', () => {
  const useCase = new ValidateIbanUseCase();

  it('validates a well-known valid IBAN and parses its parts', () => {
    const result = useCase.execute('GB29 NWBK 6016 1331 9268 19');
    expect(result).toEqual({
      ok: true,
      valid: true,
      countryCode: 'GB',
      checkDigits: '29',
      bban: 'NWBK60161331926819',
      formatted: 'GB29 NWBK 6016 1331 9268 19',
    });
  });

  it('validates another well-known valid IBAN, case-insensitively', () => {
    const result = useCase.execute('de89370400440532013000');
    expect(result.ok).toBe(true);
    expect(result.valid).toBe(true);
    expect(result.countryCode).toBe('DE');
  });

  it('flags a checksum mismatch as invalid but still parses it', () => {
    const result = useCase.execute('GB29 NWBK 6016 1331 9268 18');
    expect(result.ok).toBe(true);
    expect(result.valid).toBe(false);
  });

  it('rejects input that does not match the IBAN shape', () => {
    expect(useCase.execute('not an iban')).toEqual({ ok: false });
  });

  it('rejects empty input', () => {
    expect(useCase.execute('')).toEqual({ ok: false });
  });
});
