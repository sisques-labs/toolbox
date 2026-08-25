import { useState } from 'react';
import {
  ConvertHtmlUseCase,
  type HtmlMode,
} from '@/core/toolbox/application/use-cases/convert-html/convert-html.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertHtmlUseCase();

export function HtmlPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('<div class="box">Hello & goodbye</div>');
  const [mode, setMode] = useState<HtmlMode>('escape');
  const result = useCase.execute(input, mode);

  return (
    <ToolPanelFrame>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={mode === 'escape' ? 'primary' : 'secondary'}
          onClick={() => setMode('escape')}
        >
          {t.actions.escape}
        </Button>
        <Button
          size="sm"
          variant={mode === 'unescape' ? 'primary' : 'secondary'}
          onClick={() => setMode('unescape')}
        >
          {t.actions.unescape}
        </Button>
      </div>
      <TextareaField
        label={mode === 'escape' ? t.labels.plainText : t.labels.htmlEntities}
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="relative">
        <pre className="min-h-[50px] whitespace-pre-wrap break-all rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100">
          {result.text}
        </pre>
        <div className="absolute right-2.5 top-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(result.text, 'Output')}
          >
            {t.actions.copy}
          </Button>
        </div>
      </div>
    </ToolPanelFrame>
  );
}
