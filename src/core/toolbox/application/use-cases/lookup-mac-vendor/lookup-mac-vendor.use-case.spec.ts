import { LookupMacVendorUseCase } from './lookup-mac-vendor.use-case';

describe('LookupMacVendorUseCase', () => {
  const useCase = new LookupMacVendorUseCase();

  it('finds the vendor for a known OUI, ignoring separators and case', () => {
    expect(useCase.execute('f0:ee:7a:11:22:33')).toEqual({
      ok: true,
      vendor: 'Apple, Inc.',
      prefix: 'F0:EE:7A',
    });
  });

  it('finds the vendor for a dash-separated address', () => {
    expect(useCase.execute('D0-43-1E-AA-BB-CC').vendor).toBe('Dell Inc.');
  });

  it('returns not found for an unknown prefix', () => {
    expect(useCase.execute('00:00:00:11:22:33')).toEqual({
      ok: false,
      reason: 'not-found',
    });
  });

  it('rejects a malformed address', () => {
    expect(useCase.execute('not-a-mac')).toEqual({
      ok: false,
      reason: 'invalid',
    });
  });
});
