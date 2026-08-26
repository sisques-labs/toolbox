import { ConvertTextBinaryUseCase } from './convert-text-binary.use-case';

describe('ConvertTextBinaryUseCase', () => {
  const useCase = new ConvertTextBinaryUseCase();

  it('converts text to space-separated 8-bit binary', () => {
    expect(useCase.toBinary('Hi')).toBe('01001000 01101001');
  });

  it('converts binary back to text', () => {
    expect(useCase.fromBinary('01001000 01101001')).toEqual({
      ok: true,
      text: 'Hi',
    });
  });

  it('round-trips text with multi-byte UTF-8 characters', () => {
    const binary = useCase.toBinary('café');
    expect(useCase.fromBinary(binary)).toEqual({ ok: true, text: 'café' });
  });

  it('rejects binary with invalid tokens', () => {
    expect(useCase.fromBinary('0100100 nope').ok).toBe(false);
  });
});
