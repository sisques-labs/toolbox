import { ExpandIpRangeUseCase } from './expand-ip-range.use-case';

describe('ExpandIpRangeUseCase', () => {
  const useCase = new ExpandIpRangeUseCase();

  it('lists every address in a small CIDR block', () => {
    const result = useCase.execute('192.168.1.0/30');
    expect(result.ok).toBe(true);
    expect(result.addresses).toEqual([
      '192.168.1.0',
      '192.168.1.1',
      '192.168.1.2',
      '192.168.1.3',
    ]);
    expect(result.truncated).toBe(false);
  });

  it('rejects an invalid CIDR', () => {
    expect(useCase.execute('not-a-cidr').ok).toBe(false);
  });

  it('truncates very large ranges to avoid huge output', () => {
    const result = useCase.execute('10.0.0.0/8');
    expect(result.ok).toBe(true);
    expect(result.addresses!.length).toBeLessThanOrEqual(1024);
    expect(result.truncated).toBe(true);
  });
});
