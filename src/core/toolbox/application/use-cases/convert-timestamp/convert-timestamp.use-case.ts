export interface TimestampResult {
  iso: string;
  utc: string;
  relative: string;
  datetimeLocal: string;
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

export class ConvertTimestampUseCase {
  execute(epochMs: number, now: number = Date.now()): TimestampResult {
    const date = new Date(epochMs);
    const pad2 = (n: number) => String(n).padStart(2, '0');
    const datetimeLocal = `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}T${pad2(date.getHours())}:${pad2(date.getMinutes())}`;

    return {
      iso: date.toISOString(),
      utc: date.toUTCString(),
      relative: this.relativeTime(epochMs, now),
      datetimeLocal,
    };
  }

  private relativeTime(epochMs: number, now: number): string {
    const diffSec = Math.round((epochMs - now) / 1000);
    const abs = Math.abs(diffSec);
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    for (const [unit, secondsInUnit] of RELATIVE_UNITS) {
      if (abs >= secondsInUnit || unit === 'second') {
        return rtf.format(Math.round(diffSec / secondsInUnit), unit);
      }
    }
    return rtf.format(0, 'second');
  }
}
