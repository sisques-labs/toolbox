import { useState } from 'react';
import { SearchMimeTypesUseCase } from '@/core/toolbox/application/use-cases/search-mime-types/search-mime-types.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new SearchMimeTypesUseCase();

export function MimeTypesPanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [query, setQuery] = useState('');
  const results = useCase.execute(query);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.mimeTypeQuery}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 ? (
        <div className="flex max-h-[420px] flex-col gap-2 overflow-y-auto">
          {results.map((entry) => (
            <div
              key={entry.extension}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
                {entry.extension}
              </span>
              <span className="font-mono text-sm text-slate-700 dark:text-slate-300">
                {entry.mimeType}
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
