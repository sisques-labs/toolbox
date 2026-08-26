import { useState } from 'react';
import { ConvertRomanNumeralUseCase } from '@/core/toolbox/application/use-cases/convert-roman-numeral/convert-roman-numeral.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertRomanNumeralUseCase();

export function RomanPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('1994');
  const result = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.inputText}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {result.ok ? (
        <div className="flex flex-col gap-2">
          <ResultRow
            label={t.labels.decimal}
            value={String(result.arabic)}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(String(result.arabic), t.labels.decimal)}
          />
          <ResultRow
            value={result.roman!}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(result.roman!, 'Roman')}
          />
        </div>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidRoman}
        </p>
      )}
    </ToolPanelFrame>
  );
}
