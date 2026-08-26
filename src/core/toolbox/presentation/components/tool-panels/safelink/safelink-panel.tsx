import { useState } from 'react';
import { DecodeSafelinkUseCase } from '@/core/toolbox/application/use-cases/decode-safelink/decode-safelink.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new DecodeSafelinkUseCase();

export function SafelinkPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState(
    'https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fexample.com%2Fpath%3Fa%3D1&data=abc',
  );
  const result = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.safelinkInput}
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {result.ok ? (
        <ResultRow
          label={t.labels.decodedUrl}
          value={result.url!}
          copyLabel={t.actions.copy}
          onCopy={() => onCopy(result.url!, t.labels.decodedUrl)}
        />
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidSafelink}
        </p>
      )}
    </ToolPanelFrame>
  );
}
