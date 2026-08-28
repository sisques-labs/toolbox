import { useState } from 'react';
import { ObfuscateStringUseCase } from '@/core/toolbox/application/use-cases/obfuscate-string/obfuscate-string.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ObfuscateStringUseCase();

export function StringObfuscatorPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [text, setText] = useState('4242424242424242');
  const [visibleStart, setVisibleStart] = useState(4);
  const [visibleEnd, setVisibleEnd] = useState(4);
  const [maskChar, setMaskChar] = useState('*');

  const output = useCase.execute(text, { visibleStart, visibleEnd, maskChar });

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.inputText}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <TextField
          label={t.fields.obfuscateVisibleStart}
          type="number"
          value={visibleStart}
          onChange={(e) => setVisibleStart(Math.max(0, Number(e.target.value)))}
        />
        <TextField
          label={t.fields.obfuscateVisibleEnd}
          type="number"
          value={visibleEnd}
          onChange={(e) => setVisibleEnd(Math.max(0, Number(e.target.value)))}
        />
        <TextField
          label={t.fields.obfuscateMaskChar}
          value={maskChar}
          onChange={(e) => setMaskChar(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
        <div
          data-testid="obfuscator-output"
          className="break-all font-mono text-sm text-slate-900 dark:text-slate-100"
        >
          {output}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(output, t.tools['string-obfuscator'].label)}
        >
          {t.actions.copy}
        </Button>
      </div>
    </ToolPanelFrame>
  );
}
