import { useState } from 'react';
import { ValidateIbanUseCase } from '@/core/toolbox/application/use-cases/validate-iban/validate-iban.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Badge } from '@/shared/presentation/components/badge/badge';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ValidateIbanUseCase();

export function IbanPanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [input, setInput] = useState('GB29 NWBK 6016 1331 9268 19');
  const result = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.ibanInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {result.ok ? (
        <div className="flex flex-col gap-2">
          <Badge tone={result.valid ? 'success' : 'danger'}>
            {result.valid ? t.labels.ibanValid : t.labels.ibanInvalid}
          </Badge>
          <ResultRow
            label={t.labels.ibanCountryCode}
            value={result.countryCode!}
          />
          <ResultRow
            label={t.labels.ibanCheckDigits}
            value={result.checkDigits!}
          />
          <ResultRow label={t.labels.ibanBban} value={result.bban!} />
          <ResultRow label={t.labels.ibanFormatted} value={result.formatted!} />
        </div>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidIban}
        </p>
      )}
    </ToolPanelFrame>
  );
}
