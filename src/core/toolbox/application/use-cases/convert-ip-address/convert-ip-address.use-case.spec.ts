import { ConvertIpAddressUseCase } from './convert-ip-address.use-case';

describe('ConvertIpAddressUseCase', () => {
  const useCase = new ConvertIpAddressUseCase();

  it('converts a dotted-decimal IPv4 address to integer, hex and binary', () => {
    expect(useCase.execute('192.168.1.1')).toEqual({
      ok: true,
      integer: '3232235777',
      hex: '0xC0A80101',
      binary: '11000000.10101000.00000001.00000001',
    });
  });

  it('converts the all-zeros address', () => {
    expect(useCase.execute('0.0.0.0')).toEqual({
      ok: true,
      integer: '0',
      hex: '0x00000000',
      binary: '00000000.00000000.00000000.00000000',
    });
  });

  it('converts the broadcast address', () => {
    expect(useCase.execute('255.255.255.255')).toEqual({
      ok: true,
      integer: '4294967295',
      hex: '0xFFFFFFFF',
      binary: '11111111.11111111.11111111.11111111',
    });
  });

  it('rejects an octet greater than 255', () => {
    expect(useCase.execute('192.168.1.256')).toEqual({ ok: false });
  });

  it('rejects an address with the wrong number of octets', () => {
    expect(useCase.execute('192.168.1')).toEqual({ ok: false });
  });

  it('rejects non-numeric input', () => {
    expect(useCase.execute('not.an.ip.address')).toEqual({ ok: false });
  });

  it('trims surrounding whitespace before validating', () => {
    expect(useCase.execute('  10.0.0.1  ')).toEqual({
      ok: true,
      integer: '167772161',
      hex: '0x0A000001',
      binary: '00001010.00000000.00000000.00000001',
    });
  });
});
