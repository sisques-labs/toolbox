export interface IbanResult {
  ok: boolean;
  valid?: boolean;
  countryCode?: string;
  checkDigits?: string;
  bban?: string;
  formatted?: string;
}

const IBAN_PATTERN = /^([A-Z]{2})(\d{2})([A-Z0-9]{11,30})$/;

function mod97Valid(
  countryCode: string,
  checkDigits: string,
  bban: string,
): boolean {
  const rearranged = `${bban}${countryCode}${checkDigits}`;
  const numeric = rearranged
    .split('')
    .map((char) =>
      /[0-9]/.test(char) ? char : String(char.charCodeAt(0) - 55),
    )
    .join('');

  return BigInt(numeric) % 97n === 1n;
}

export class ValidateIbanUseCase {
  execute(raw: string): IbanResult {
    const cleaned = raw.replace(/\s+/g, '').toUpperCase();
    const match = cleaned.match(IBAN_PATTERN);
    if (!match) return { ok: false };

    const [, countryCode, checkDigits, bban] = match;

    return {
      ok: true,
      valid: mod97Valid(countryCode, checkDigits, bban),
      countryCode,
      checkDigits,
      bban,
      formatted: cleaned.match(/.{1,4}/g)!.join(' '),
    };
  }
}
