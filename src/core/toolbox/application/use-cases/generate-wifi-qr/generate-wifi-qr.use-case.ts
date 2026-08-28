import { renderSVG } from 'uqr';

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

export interface WifiQrOptions {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
  hidden: boolean;
}

export type WifiQrResult = { ok: true; svg: string } | { ok: false };

function escapeField(value: string): string {
  return value.replace(/([\\;,":])/g, '\\$1');
}

export class GenerateWifiQrUseCase {
  buildPayload({ ssid, password, encryption, hidden }: WifiQrOptions): string {
    return `WIFI:T:${encryption};S:${escapeField(ssid)};P:${escapeField(password)};H:${hidden};;`;
  }

  execute(options: WifiQrOptions): WifiQrResult {
    if (!options.ssid.trim()) return { ok: false };
    return { ok: true, svg: renderSVG(this.buildPayload(options)) };
  }
}
