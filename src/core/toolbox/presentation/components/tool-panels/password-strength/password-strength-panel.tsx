import { useState } from 'react';
import { AnalyzePasswordStrengthUseCase } from '@/core/toolbox/application/use-cases/analyze-password-strength/analyze-password-strength.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Badge } from '@/shared/presentation/components/badge/badge';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new AnalyzePasswordStrengthUseCase();

const STRENGTH_TONE = {
  weak: 'danger',
  fair: 'warning',
  strong: 'primary',
  veryStrong: 'success',
} as const;

function formatCrackTime(
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

export function PasswordStrengthPanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
}) {
  const [password, setPassword] = useState('');
  const result = useCase.execute(password);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.inputText}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Badge tone={STRENGTH_TONE[result.strength]}>
          {t.strength[result.strength]}
        </Badge>
      </div>
      <ResultRow
        label={t.labels.passwordEntropy}
        value={t.labels.entropyBitsValue.replace(
          '{count}',
          String(Math.round(result.entropyBits)),
        )}
      />
      <ResultRow
        label={t.labels.passwordCrackTime}
        value={formatCrackTime(result.crackTimeSeconds, t)}
      />
    </ToolPanelFrame>
  );
}
