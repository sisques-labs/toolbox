import { useState } from 'react';
import { NormalizeEmailUseCase } from '@/core/toolbox/application/use-cases/normalize-email/normalize-email.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new NormalizeEmailUseCase();

export function EmailNormalizerPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [email, setEmail] = useState('John.Doe+newsletter@Gmail.com');
  const result = useCase.execute(email);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.emailInput}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {result.ok ? (
        <ResultRow
          label={t.labels.normalizedEmail}
          value={result.normalized!}
          copyLabel={t.actions.copy}
          onCopy={() => onCopy(result.normalized!, t.labels.normalizedEmail)}
        />
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidEmail}
        </p>
      )}
    </ToolPanelFrame>
  );
}
