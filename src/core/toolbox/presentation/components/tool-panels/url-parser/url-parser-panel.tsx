import { useState } from 'react';
import { ParseUrlUseCase } from '@/core/toolbox/application/use-cases/parse-url/parse-url.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ParseUrlUseCase();

export function UrlParserPanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [input, setInput] = useState(
    'https://example.com/path?query=value#section',
  );
  const result = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.urlParserInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {result.ok ? (
        <div className="flex flex-col gap-2">
          <ResultRow label={t.labels.protocol} value={result.protocol!} />
          <ResultRow label={t.labels.hostname} value={result.hostname!} />
          <ResultRow label={t.labels.port} value={result.port || '—'} />
          <ResultRow label={t.labels.pathname} value={result.pathname!} />
          <ResultRow label={t.labels.fragment} value={result.hash || '—'} />
          <ResultRow
            label={t.labels.queryParams}
            value={
              result.searchParams!.length
                ? result
                    .searchParams!.map((p) => `${p.key}=${p.value}`)
                    .join(', ')
                : '—'
            }
          />
        </div>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidUrl}
        </p>
      )}
    </ToolPanelFrame>
  );
}
