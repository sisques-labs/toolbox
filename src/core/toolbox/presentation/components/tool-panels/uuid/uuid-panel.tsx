import { useState } from 'react';
import { GenerateUuidUseCase } from '@/core/toolbox/application/use-cases/generate-uuid/generate-uuid.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateUuidUseCase();

export function UuidPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState(() => useCase.execute(5));

  return (
    <ToolPanelFrame>
      <div className="flex items-end gap-2.5">
        <div className="flex-1">
          <TextField
            label={t.fields.count}
            type="number"
            value={count}
            onChange={(e) => {
              const next = Math.max(
                1,
                Math.min(50, Number(e.target.value) || 1),
              );
              setCount(next);
            }}
          />
        </div>
        <Button
          variant="primary"
          onClick={() => setUuids(useCase.execute(count))}
        >
          {t.actions.generate}
        </Button>
        <Button
          variant="secondary"
          onClick={() => onCopy(uuids.join('\n'), 'UUIDs')}
        >
          {t.actions.copyAll}
        </Button>
      </div>
      <div className="flex flex-col gap-1.5">
        {uuids.map((uuid) => (
          <div key={uuid} data-testid="uuid-row">
            <ResultRow
              value={uuid}
              copyLabel={t.actions.copy}
              onCopy={() => onCopy(uuid, 'UUID')}
            />
          </div>
        ))}
      </div>
    </ToolPanelFrame>
  );
}
