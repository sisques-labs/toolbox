import { useState } from 'react';
import { GenerateLoremUseCase } from '@/core/toolbox/application/use-cases/generate-lorem/generate-lorem.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateLoremUseCase();

export function LoremPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState(() => useCase.execute(3));

  function regenerate(count: number) {
    setOutput(useCase.execute(count));
  }

  return (
    <ToolPanelFrame>
      <div className="flex items-end gap-2.5">
        <div className="flex-1">
          <TextField
            label={t.fields.paragraphs}
            type="number"
            value={paragraphs}
            onChange={(e) => {
              const next = Math.max(
                1,
                Math.min(20, Number(e.target.value) || 1),
              );
              setParagraphs(next);
            }}
          />
        </div>
        <Button variant="primary" onClick={() => regenerate(paragraphs)}>
          {t.actions.generate}
        </Button>
      </div>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(output, t.tools.lorem.label)}
        >
          {t.actions.copy}
        </Button>
      </div>
      <div
        data-testid="lorem-output"
        className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
      >
        {output}
      </div>
    </ToolPanelFrame>
  );
}
