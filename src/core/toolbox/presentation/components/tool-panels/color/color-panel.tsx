import { useState } from 'react';
import { ConvertColorUseCase } from '@/core/toolbox/application/use-cases/convert-color/convert-color.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertColorUseCase();

export function ColorPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('#336699');
  const result = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.colorInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="#336699 / rgb(51, 102, 153) / hsl(210, 50%, 40%)"
      />
      {result.ok ? (
        <>
          <div
            className="h-16 w-full rounded-lg border border-slate-200 dark:border-slate-800"
            style={{ backgroundColor: result.hex }}
            aria-hidden="true"
          />
          <div className="flex flex-col gap-2">
            <ResultRow
              label={t.labels.hex}
              value={result.hex}
              copyLabel={t.actions.copy}
              onCopy={() => onCopy(result.hex, t.labels.hex)}
            />
            <ResultRow
              label={t.labels.rgb}
              value={result.rgb}
              copyLabel={t.actions.copy}
              onCopy={() => onCopy(result.rgb, t.labels.rgb)}
            />
            <ResultRow
              label={t.labels.hsl}
              value={result.hsl}
              copyLabel={t.actions.copy}
              onCopy={() => onCopy(result.hsl, t.labels.hsl)}
            />
          </div>
        </>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidColor}
        </p>
      )}
    </ToolPanelFrame>
  );
}
