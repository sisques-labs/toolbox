import { CalculateSubnetUseCase } from './calculate-subnet.use-case';

describe('CalculateSubnetUseCase', () => {
  const useCase = new CalculateSubnetUseCase();

  it('calculates a standard /24 subnet', () => {
    const result = useCase.execute('192.168.1.0/24');

    expect(result).toEqual({
      ok: true,
      prefix: 24,
      network: '192.168.1.0',
      broadcast: '192.168.1.255',
      mask: '255.255.255.0',
      firstHost: '192.168.1.1',
      lastHost: '192.168.1.254',
      total: 256,
      usable: 254,
    });
  });

  it('treats a /32 as a single host', () => {
    const result = useCase.execute('10.0.0.5/32');

    expect(result).toEqual(
      expect.objectContaining({
        ok: true,
        total: 1,
        usable: 1,
        firstHost: '10.0.0.5',
        lastHost: '10.0.0.5',
      }),
    );
  });

  it('treats a /31 as a point-to-point link with both addresses usable', () => {
    const result = useCase.execute('10.0.0.0/31');

    expect(result).toEqual(
      expect.objectContaining({
        ok: true,
        total: 2,
        usable: 2,
        firstHost: '10.0.0.0',
        lastHost: '10.0.0.1',
      }),
    );
  });

  it('rejects malformed CIDR input', () => {
    expect(useCase.execute('not a cidr')).toEqual({ ok: false });
    expect(useCase.execute('10.0.0.0/33')).toEqual({ ok: false });
    expect(useCase.execute('999.0.0.0/24')).toEqual({ ok: false });
  });
});
