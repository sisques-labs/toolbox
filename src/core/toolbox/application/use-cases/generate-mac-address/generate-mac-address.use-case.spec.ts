import { GenerateMacAddressUseCase } from './generate-mac-address.use-case';

describe('GenerateMacAddressUseCase', () => {
  const useCase = new GenerateMacAddressUseCase();

  it('generates a colon-separated MAC address by default', () => {
    const mac = useCase.execute({
      locallyAdministered: false,
      multicast: false,
      separator: ':',
    });
    expect(mac).toMatch(/^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/);
  });

  it('uses a dash separator when requested', () => {
    const mac = useCase.execute({
      locallyAdministered: false,
      multicast: false,
      separator: '-',
    });
    expect(mac).toMatch(/^[0-9a-f]{2}(-[0-9a-f]{2}){5}$/);
  });

  it('sets the locally-administered bit when requested', () => {
    const mac = useCase.execute({
      locallyAdministered: true,
      multicast: false,
      separator: ':',
    });
    const firstOctet = parseInt(mac.split(':')[0], 16);
    expect(firstOctet & 0b10).toBe(0b10);
  });

  it('sets the multicast bit when requested', () => {
    const mac = useCase.execute({
      locallyAdministered: false,
      multicast: true,
      separator: ':',
    });
    const firstOctet = parseInt(mac.split(':')[0], 16);
    expect(firstOctet & 0b1).toBe(0b1);
  });
});
