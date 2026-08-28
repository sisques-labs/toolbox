export interface PhoneParseResult {
  ok: boolean;
  dialCode?: string;
  countryName?: string;
  nationalNumber?: string;
  formatted?: string;
}

const DIAL_CODES: [string, string][] = [
  ['1', 'United States / Canada'],
  ['7', 'Russia / Kazakhstan'],
  ['20', 'Egypt'],
  ['27', 'South Africa'],
  ['30', 'Greece'],
  ['31', 'Netherlands'],
  ['32', 'Belgium'],
  ['33', 'France'],
  ['34', 'Spain'],
  ['39', 'Italy'],
  ['41', 'Switzerland'],
  ['43', 'Austria'],
  ['44', 'United Kingdom'],
  ['45', 'Denmark'],
  ['46', 'Sweden'],
  ['47', 'Norway'],
  ['48', 'Poland'],
  ['49', 'Germany'],
  ['52', 'Mexico'],
  ['54', 'Argentina'],
  ['55', 'Brazil'],
  ['61', 'Australia'],
  ['64', 'New Zealand'],
  ['81', 'Japan'],
  ['82', 'South Korea'],
  ['86', 'China'],
  ['90', 'Turkey'],
  ['91', 'India'],
  ['234', 'Nigeria'],
  ['351', 'Portugal'],
  ['353', 'Ireland'],
  ['358', 'Finland'],
  ['971', 'United Arab Emirates'],
  ['972', 'Israel'],
];

function groupDigits(digits: string): string {
  return (digits.match(/.{1,3}/g) ?? []).join(' ');
}

export class ParsePhoneUseCase {
  execute(input: string): PhoneParseResult {
    const cleaned = input.replace(/[\s\-().]/g, '');
    if (!cleaned.startsWith('+')) return { ok: false };

    const digits = cleaned.slice(1);
    if (!/^\d+$/.test(digits)) return { ok: false };

    const match = [...DIAL_CODES]
      .sort((a, b) => b[0].length - a[0].length)
      .find(([code]) => digits.startsWith(code));
    if (!match) return { ok: false };

    const [dialCode, countryName] = match;
    const nationalNumber = digits.slice(dialCode.length);
    if (!nationalNumber) return { ok: false };

    return {
      ok: true,
      dialCode,
      countryName,
      nationalNumber,
      formatted: `+${dialCode} ${groupDigits(nationalNumber)}`,
    };
  }
}
