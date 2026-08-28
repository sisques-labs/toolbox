import { MAC_VENDOR_PREFIXES } from './mac-vendor-prefixes';

export interface MacVendorResult {
  ok: boolean;
  reason?: 'invalid' | 'not-found';
  vendor?: string;
  prefix?: string;
}

const MAC_PATTERN = /^[0-9a-fA-F]{2}([:-][0-9a-fA-F]{2}){5}$/;

export class LookupMacVendorUseCase {
  execute(mac: string): MacVendorResult {
    const trimmed = mac.trim();
    if (!MAC_PATTERN.test(trimmed)) return { ok: false, reason: 'invalid' };

    const hex = trimmed.replace(/[:-]/g, '').toUpperCase();
    const prefixHex = hex.slice(0, 6);
    const vendor = MAC_VENDOR_PREFIXES[prefixHex];
    if (!vendor) return { ok: false, reason: 'not-found' };

    const prefix = `${prefixHex.slice(0, 2)}:${prefixHex.slice(2, 4)}:${prefixHex.slice(4, 6)}`;
    return { ok: true, vendor, prefix };
  }
}
