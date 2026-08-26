import { useState } from 'react';
import { CalculateEtaUseCase } from '@/core/toolbox/application/use-cases/calculate-eta/calculate-eta.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { formatDuration } from '@/core/toolbox/presentation/format-duration';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new CalculateEtaUseCase();

export function EtaPanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [unitsCompleted, setUnitsCompleted] = useState(25);
  const [totalUnits, setTotalUnits] = useState(100);
  const [elapsedSeconds, setElapsedSeconds] = useState(50);
  const result = useCase.execute({
    unitsCompleted,
    totalUnits,
    elapsedSeconds,
  });

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.etaUnitsCompleted}
        type="number"
        value={unitsCompleted}
        onChange={(e) => setUnitsCompleted(Number(e.target.value))}
      />
      <TextField
        label={t.fields.etaTotalUnits}
        type="number"
        value={totalUnits}
        onChange={(e) => setTotalUnits(Number(e.target.value))}
      />
      <TextField
        label={t.fields.etaElapsedSeconds}
        type="number"
        value={elapsedSeconds}
        onChange={(e) => setElapsedSeconds(Number(e.target.value))}
      />
      {result.ok ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="mb-0.5 text-[11px] font-semibold text-slate-400 dark:text-slate-400">
            {t.labels.etaRemaining}
          </div>
          <div
            data-testid="eta-result"
            className="font-mono text-sm text-slate-900 dark:text-slate-100"
          >
            {formatDuration(result.remainingSeconds!, t)}
          </div>
        </div>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidEtaInput}
        </p>
      )}
    </ToolPanelFrame>
  );
}
