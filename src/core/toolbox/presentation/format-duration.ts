import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

export function formatDuration(
  seconds: number,
  t: WidenStringLiterals<ToolboxDict>,
): string {
  if (seconds < 1) return t.labels.timeInstant;
  if (seconds < 60)
    return t.labels.timeSeconds.replace('{count}', String(Math.round(seconds)));
  if (seconds < 3600)
    return t.labels.timeMinutes.replace(
      '{count}',
      String(Math.round(seconds / 60)),
    );
  if (seconds < 86400)
    return t.labels.timeHours.replace(
      '{count}',
      String(Math.round(seconds / 3600)),
    );
  const years = seconds / (86400 * 365);
  if (years < 1)
    return t.labels.timeDays.replace(
      '{count}',
      String(Math.round(seconds / 86400)),
    );
  if (years > 1000) return t.labels.timeCenturies;
  return t.labels.timeYears.replace('{count}', String(Math.round(years)));
}
