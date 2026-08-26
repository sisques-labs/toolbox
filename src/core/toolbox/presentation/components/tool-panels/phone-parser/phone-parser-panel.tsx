import { useState } from 'react';
import { ParsePhoneUseCase } from '@/core/toolbox/application/use-cases/parse-phone/parse-phone.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ParsePhoneUseCase();

export function PhoneParserPanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
}) {
  const [input, setInput] = useState('+34 612 345 678');
  const result = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.phoneInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {result.ok ? (
        <div className="flex flex-col gap-2">
          <ResultRow label={t.labels.country} value={result.countryName!} />
          <ResultRow label={t.labels.dialCode} value={`+${result.dialCode}`} />
          <ResultRow
            label={t.labels.nationalNumber}
            value={result.nationalNumber!}
          />
          <ResultRow
            label={t.labels.formattedNumber}
            value={result.formatted!}
          />
        </div>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidPhone}
        </p>
      )}
    </ToolPanelFrame>
  );
}
