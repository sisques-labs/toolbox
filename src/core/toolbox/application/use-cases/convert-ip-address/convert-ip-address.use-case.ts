export interface IpAddressResult {
  ok: boolean;
  integer?: string;
  hex?: string;
  binary?: string;
}

const IPV4_PATTERN = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

export class ConvertIpAddressUseCase {
  execute(address: string): IpAddressResult {
    const match = address.trim().match(IPV4_PATTERN);
    if (!match) return { ok: false };

    const octets = match.slice(1, 5).map(Number);
    if (octets.some((o) => o > 255)) return { ok: false };

    const integer =
      ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>>
      0;

    return {
      ok: true,
      integer: String(integer),
      hex: `0x${integer.toString(16).toUpperCase().padStart(8, '0')}`,
      binary: octets.map((o) => o.toString(2).padStart(8, '0')).join('.'),
    };
  }
}
