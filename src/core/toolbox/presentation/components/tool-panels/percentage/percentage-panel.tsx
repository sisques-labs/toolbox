import { useState } from 'react';
import { CalculatePercentageUseCase } from '@/core/toolbox/application/use-cases/calculate-percentage/calculate-percentage.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new CalculatePercentageUseCase();

function formatResult(value: number): string {
  return Number.isFinite(value) ? String(Math.round(value * 1000) / 1000) : '—';
}

export function PercentagePanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
}) {
  const [percent, setPercent] = useState(25);
  const [value, setValue] = useState(200);
  const [part, setPart] = useState(50);
  const [whole, setWhole] = useState(200);
  const [from, setFrom] = useState(200);
  const [to, setTo] = useState(250);

  return (
    <ToolPanelFrame>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {t.labels.percentOfHeading}
        </p>
        <div className="flex items-end gap-3">
          <TextField
            label={t.fields.percentPercent}
            type="number"
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
          />
          <TextField
            label={t.fields.percentValue}
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <div
            data-testid="percent-of-result"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
          >
            {formatResult(useCase.percentOf(percent, value))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {t.labels.whatPercentHeading}
        </p>
        <div className="flex items-end gap-3">
          <TextField
            label={t.fields.percentPart}
            type="number"
            value={part}
            onChange={(e) => setPart(Number(e.target.value))}
          />
          <TextField
            label={t.fields.percentWhole}
            type="number"
            value={whole}
            onChange={(e) => setWhole(Number(e.target.value))}
          />
          <div
            data-testid="what-percent-result"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
          >
            {formatResult(useCase.whatPercent(part, whole))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {t.labels.percentChangeHeading}
        </p>
        <div className="flex items-end gap-3">
          <TextField
            label={t.fields.percentFrom}
            type="number"
            value={from}
            onChange={(e) => setFrom(Number(e.target.value))}
          />
          <TextField
            label={t.fields.percentTo}
            type="number"
            value={to}
            onChange={(e) => setTo(Number(e.target.value))}
          />
          <div
            data-testid="percent-change-result"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
          >
            {formatResult(useCase.percentChange(from, to))}
          </div>
        </div>
      </div>
    </ToolPanelFrame>
  );
}
