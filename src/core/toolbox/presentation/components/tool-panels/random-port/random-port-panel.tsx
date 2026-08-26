import { useState } from 'react';
import {
  GenerateRandomPortUseCase,
  type PortRange,
} from '@/core/toolbox/application/use-cases/generate-random-port/generate-random-port.use-case';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateRandomPortUseCase();

export function RandomPortPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [range, setRange] = useState<PortRange>('well-known');
  const [port, setPort] = useState(() => useCase.execute(range));

  return (
    <ToolPanelFrame>
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 dark:border-slate-800 dark:bg-slate-800/50">
        <div
          data-testid="random-port-value"
          className="font-mono text-lg text-slate-900 dark:text-slate-100"
        >
          {port}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(String(port), t.tools['random-port'].label)}
        >
          {t.actions.copy}
        </Button>
      </div>
      <div className="flex items-end gap-3.5">
        <div className="flex-1">
          <SelectField
            label={t.fields.portRange}
            value={range}
            onChange={(e) => {
              const next = e.target.value as PortRange;
              setRange(next);
              setPort(useCase.execute(next));
            }}
            options={[
              { value: 'well-known', label: t.labels.portWellKnown },
              { value: 'registered', label: t.labels.portRegistered },
              { value: 'dynamic', label: t.labels.portDynamic },
              { value: 'any', label: t.labels.portAny },
            ]}
          />
        </div>
        <Button
          variant="primary"
          onClick={() => setPort(useCase.execute(range))}
        >
          {t.actions.generate}
        </Button>
      </div>
    </ToolPanelFrame>
  );
}
