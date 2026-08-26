import { useState } from 'react';
import { DrawAsciiTextUseCase } from '@/core/toolbox/application/use-cases/draw-ascii-text/draw-ascii-text.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new DrawAsciiTextUseCase();

export function AsciiDrawerPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('Toolbox');
  const output = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.inputText}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <pre
        data-testid="ascii-output"
        className="overflow-auto whitespace-pre rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm leading-tight text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
      >
        {output}
      </pre>
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(output, t.tools['ascii-drawer'].label)}
        >
          {t.actions.copy}
        </Button>
      </div>
    </ToolPanelFrame>
  );
}
