import { useState } from 'react';
import { ConvertMarkdownHtmlUseCase } from '@/core/toolbox/application/use-cases/convert-markdown-html/convert-markdown-html.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertMarkdownHtmlUseCase();
const DEFAULT_INPUT = '# Title\n\n**bold** and *italic* text.\n\n- one\n- two';

export function MarkdownHtmlPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const html = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.markdownInput}
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <pre
        data-testid="markdown-html-output"
        className="overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
      >
        {html}
      </pre>
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(html, t.tools['markdown-html'].label)}
        >
          {t.actions.copy}
        </Button>
      </div>
    </ToolPanelFrame>
  );
}
