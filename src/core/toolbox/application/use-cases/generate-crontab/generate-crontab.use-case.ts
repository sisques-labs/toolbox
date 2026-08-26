export interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export type CrontabResult =
  | { ok: true; expression: string; description: string }
  | { ok: false; error: 'invalid' };

const FIELD_ORDER = [
  'minute',
  'hour',
  'dayOfMonth',
  'month',
  'dayOfWeek',
] as const;

const FIELD_RANGES: Record<(typeof FIELD_ORDER)[number], [number, number]> = {
  minute: [0, 59],
  hour: [0, 23],
  dayOfMonth: [1, 31],
  month: [1, 12],
  dayOfWeek: [0, 7],
};

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function isValidPart(part: string, min: number, max: number): boolean {
  if (part === '*') return true;

  const stepMatch = /^(\*|\d+(?:-\d+)?)\/(\d+)$/.exec(part);
  if (stepMatch) {
    const base = stepMatch[1];
    const step = Number(stepMatch[2]);
    if (!Number.isInteger(step) || step <= 0) return false;
    if (base === '*') return true;
    return isValidPart(base, min, max);
  }

  const rangeMatch = /^(\d+)-(\d+)$/.exec(part);
  if (rangeMatch) {
    const a = Number(rangeMatch[1]);
    const b = Number(rangeMatch[2]);
    return (
      Number.isInteger(a) &&
      Number.isInteger(b) &&
      a >= min &&
      b <= max &&
      a <= b
    );
  }

  const list = part.split(',');
  if (list.length > 1) {
    return list.every((item) => isValidPart(item, min, max));
  }

  const n = Number(part);
  return Number.isInteger(n) && n >= min && n <= max;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function describeDayOfWeek(part: string): string | null {
  if (part === '*') return null;
  if (part === '1-5') return 'on weekdays (Mon–Fri)';
  if (part === '0,6' || part === '6,0') return 'on weekends';
  if (/^\d+$/.test(part)) {
    const n = Number(part) % 7;
    return `on ${DAY_NAMES[n]}`;
  }
  return `on day-of-week ${part}`;
}

function describe(fields: CronFields): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = fields;

  if (
    minute === '*' &&
    hour === '*' &&
    dayOfMonth === '*' &&
    month === '*' &&
    dayOfWeek === '*'
  ) {
    return 'Every minute';
  }

  const dow = describeDayOfWeek(dayOfWeek);
  const monthBit = month === '*' ? '' : ` in month ${month}`;
  const domBit = dayOfMonth === '*' ? '' : ` on day-of-month ${dayOfMonth}`;

  if (/^\d+$/.test(minute) && /^\d+$/.test(hour)) {
    const time = `At ${pad2(Number(hour))}:${pad2(Number(minute))}`;
    if (dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
      return `${time} every day`;
    }
    const when = [dow, domBit.trim(), monthBit.trim()]
      .filter(Boolean)
      .join(' ');
    return when ? `${time} ${when}` : time;
  }

  if (/^\d+$/.test(minute) && hour === '*') {
    const base = `At minute ${minute} of every hour`;
    const when = [dow, domBit.trim(), monthBit.trim()]
      .filter(Boolean)
      .join(' ');
    return when ? `${base}, ${when}` : base;
  }

  if (minute.startsWith('*/') && hour === '*') {
    return `Every ${minute.slice(2)} minutes`;
  }

  return `Cron: ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

export class GenerateCrontabUseCase {
  build(fields: CronFields): CrontabResult {
    for (const key of FIELD_ORDER) {
      const [min, max] = FIELD_RANGES[key];
      if (!isValidPart(fields[key].trim(), min, max)) {
        return { ok: false, error: 'invalid' };
      }
    }

    const normalized: CronFields = {
      minute: fields.minute.trim(),
      hour: fields.hour.trim(),
      dayOfMonth: fields.dayOfMonth.trim(),
      month: fields.month.trim(),
      dayOfWeek: fields.dayOfWeek.trim(),
    };

    const expression = FIELD_ORDER.map((key) => normalized[key]).join(' ');
    return {
      ok: true,
      expression,
      description: describe(normalized),
    };
  }

  parse(expression: string): CrontabResult {
    const parts = expression.trim().split(/\s+/);
    if (parts.length !== 5) return { ok: false, error: 'invalid' };

    return this.build({
      minute: parts[0],
      hour: parts[1],
      dayOfMonth: parts[2],
      month: parts[3],
      dayOfWeek: parts[4],
    });
  }
}
