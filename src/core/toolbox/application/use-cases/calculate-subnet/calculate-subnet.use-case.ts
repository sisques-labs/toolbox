export interface SubnetResult {
  ok: boolean;
  prefix?: number;
  network?: string;
  broadcast?: string;
  mask?: string;
  firstHost?: string;
  lastHost?: string;
  total?: number;
  usable?: number;
}

const CIDR_PATTERN = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/;

export class CalculateSubnetUseCase {
  execute(cidr: string): SubnetResult {
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
    const broadcast = (network | (~maskNum >>> 0)) >>> 0;
    const total = Math.pow(2, 32 - prefix);
    const usable = total > 2 ? total - 2 : total;
    const toIp = (n: number) =>
      [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');

    return {
      ok: true,
      prefix,
      network: toIp(network),
      broadcast: toIp(broadcast),
      mask: toIp(maskNum),
      firstHost: total > 2 ? toIp(network + 1) : toIp(network),
      lastHost: total > 2 ? toIp(broadcast - 1) : toIp(broadcast),
      total,
      usable,
    };
  }
}
