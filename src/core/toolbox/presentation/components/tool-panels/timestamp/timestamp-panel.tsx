import { useState } from 'react';
import { ConvertTimestampUseCase } from '@/core/toolbox/application/use-cases/convert-timestamp/convert-timestamp.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertTimestampUseCase();

export function TimestampPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [epochMs, setEpochMs] = useState(() => Date.now());
  const result = useCase.execute(epochMs);

  const rows: { label: string; value: string }[] = [
    { label: t.labels.iso, value: result.iso },
    { label: t.labels.utc, value: result.utc },
    { label: t.labels.relative, value: result.relative },
  ];

  return (
    <ToolPanelFrame>
      <div className="flex items-end gap-2.5">
        <div className="flex-1">
          <TextField
            label={t.fields.unixTimestamp}
            value={String(Math.floor(epochMs / 1000))}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (Number.isFinite(n)) setEpochMs(n * 1000);
            }}
          />
        </div>
        <Button variant="secondary" onClick={() => setEpochMs(Date.now())}>
          {t.actions.now}
        </Button>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {t.fields.dateTimeLocal}
        </label>
        <input
          type="datetime-local"
          value={result.datetimeLocal}
          onChange={(e) => {
            const t = new Date(e.target.value).getTime();
            if (Number.isFinite(t)) setEpochMs(t);
          }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <ResultRow
            key={row.label}
            label={row.label}
            value={row.value}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(row.value, row.label)}
          />
        ))}
      </div>
    </ToolPanelFrame>
  );
}
