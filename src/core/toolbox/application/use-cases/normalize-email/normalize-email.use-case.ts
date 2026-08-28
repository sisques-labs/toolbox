export interface EmailNormalizeResult {
  ok: boolean;
  normalized?: string;
}

const GMAIL_DOMAINS = ['gmail.com', 'googlemail.com'];

export class NormalizeEmailUseCase {
  execute(email: string): EmailNormalizeResult {
    const trimmed = email.trim().toLowerCase();
    const atIndex = trimmed.lastIndexOf('@');
    if (atIndex === -1) return { ok: false };

    let local = trimmed.slice(0, atIndex);
    const domain = trimmed.slice(atIndex + 1);

    if (GMAIL_DOMAINS.includes(domain)) {
      local = local.split('+')[0].replace(/\./g, '');
      return { ok: true, normalized: `${local}@gmail.com` };
    }

    return { ok: true, normalized: `${local}@${domain}` };
  }
}
