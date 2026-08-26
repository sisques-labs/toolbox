import { useState } from 'react';
import { AnalyzePasswordStrengthUseCase } from '@/core/toolbox/application/use-cases/analyze-password-strength/analyze-password-strength.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Badge } from '@/shared/presentation/components/badge/badge';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import { formatDuration } from '@/core/toolbox/presentation/format-duration';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new AnalyzePasswordStrengthUseCase();

const STRENGTH_TONE = {
  weak: 'danger',
  fair: 'warning',
  strong: 'primary',
  veryStrong: 'success',
} as const;

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
        value={formatDuration(result.crackTimeSeconds, t)}
      />
    </ToolPanelFrame>
  );
}
