import { useState } from 'react';
import { FormatSqlUseCase } from '@/core/toolbox/application/use-cases/format-sql/format-sql.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new FormatSqlUseCase();
const DEFAULT_INPUT =
  'select id, name from users where active = 1 order by name';

export function SqlPrettifierPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const formatted = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.sqlInput}
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <pre
        data-testid="sql-output"
        className="overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
      >
        {formatted}
      </pre>
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(formatted, t.tools['sql-prettifier'].label)}
        >
          {t.actions.copy}
        </Button>
      </div>
    </ToolPanelFrame>
  );
}
