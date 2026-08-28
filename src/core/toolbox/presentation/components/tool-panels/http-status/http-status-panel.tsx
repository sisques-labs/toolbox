import { useState } from 'react';
import {
  SearchHttpStatusCodesUseCase,
  type HttpStatusCategory,
} from '@/core/toolbox/application/use-cases/search-http-status-codes/search-http-status-codes.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Badge } from '@/shared/presentation/components/badge/badge';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new SearchHttpStatusCodesUseCase();

const CATEGORY_TONE: Record<
  HttpStatusCategory,
  'danger' | 'warning' | 'primary' | 'success'
> = {
  informational: 'primary',
  success: 'success',
  redirection: 'warning',
  clientError: 'danger',
  serverError: 'danger',
};

export function HttpStatusPanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
}) {
  const [query, setQuery] = useState('');
  const results = useCase.execute(query);

  const categoryLabel: Record<HttpStatusCategory, string> = {
    informational: t.labels.httpInformational,
    success: t.labels.httpSuccess,
    redirection: t.labels.httpRedirection,
    clientError: t.labels.httpClientError,
    serverError: t.labels.httpServerError,
  };

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.httpStatusQuery}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 ? (
        <div className="flex max-h-[420px] flex-col gap-2 overflow-y-auto">
          {results.map((entry) => (
            <div
              key={entry.code}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {entry.code}
                </span>
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {entry.phrase}
                </span>
              </div>
              <Badge tone={CATEGORY_TONE[entry.category]}>
                {categoryLabel[entry.category]}
              </Badge>
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
