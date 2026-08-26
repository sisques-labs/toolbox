export interface IpRangeResult {
  ok: boolean;
  addresses?: string[];
  truncated?: boolean;
}

const CIDR_PATTERN = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/;
const MAX_ADDRESSES = 1024;

export class ExpandIpRangeUseCase {
  execute(cidr: string): IpRangeResult {
    const match = cidr.trim().match(CIDR_PATTERN);
    if (!match) return { ok: false };

    const octets = match.slice(1, 5).map(Number);
    if (octets.some((o) => o > 255)) return { ok: false };

    const prefix = Number(match[5]);
    if (prefix < 0 || prefix > 32) return { ok: false };

    const ipNum =
      ((octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3]) >>>
      0;
    const maskNum = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const network = (ipNum & maskNum) >>> 0;
    const total = Math.pow(2, 32 - prefix);
    const toIp = (n: number) =>
      [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');

    const count = Math.min(total, MAX_ADDRESSES);
    const addresses: string[] = [];
    for (let i = 0; i < count; i++) {
      addresses.push(toIp((network + i) >>> 0));
    }

    return { ok: true, addresses, truncated: total > MAX_ADDRESSES };
  }
}
