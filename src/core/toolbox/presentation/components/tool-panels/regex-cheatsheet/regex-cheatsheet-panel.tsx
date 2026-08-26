import { useState } from 'react';
import { SearchRegexCheatsheetUseCase } from '@/core/toolbox/application/use-cases/search-regex-cheatsheet/search-regex-cheatsheet.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new SearchRegexCheatsheetUseCase();

export function RegexCheatsheetPanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
}) {
  const [query, setQuery] = useState('');
  const results = useCase.execute(query);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.cheatsheetQuery}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 ? (
        <div className="flex max-h-[420px] flex-col gap-2 overflow-y-auto">
          {results.map((entry) => (
            <div
              key={entry.token}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
                {entry.token}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {entry.description}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t.labels.noMatches}
        </p>
      )}
    </ToolPanelFrame>
  );
}
