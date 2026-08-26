import { GenerateIpv6UlaUseCase } from './generate-ipv6-ula.use-case';

describe('GenerateIpv6UlaUseCase', () => {
  const useCase = new GenerateIpv6UlaUseCase();

  it('generates an fd00::/8 unique local address prefix with a /64 subnet', () => {
    const ula = useCase.execute();
    expect(ula).toMatch(/^fd[0-9a-f]{2}:[0-9a-f]{4}:[0-9a-f]{4}:0000::\/64$/);
  });

  it('embeds a custom 16-bit subnet id', () => {
    const ula = useCase.execute('abcd');
    expect(ula.endsWith(':abcd::/64')).toBe(true);
  });

  it('generates a different global id on each call', () => {
    const a = useCase.execute();
    const b = useCase.execute();
    expect(a).not.toBe(b);
  });
});
