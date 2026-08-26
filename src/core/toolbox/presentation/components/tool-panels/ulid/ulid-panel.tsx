import { useState } from 'react';
import { GenerateUlidUseCase } from '@/core/toolbox/application/use-cases/generate-ulid/generate-ulid.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateUlidUseCase();

export function UlidPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [count, setCount] = useState(5);
  const [ulids, setUlids] = useState(() => useCase.execute(5));

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
          onClick={() => setUlids(useCase.execute(count))}
        >
          {t.actions.generate}
        </Button>
        <Button
          variant="secondary"
          onClick={() => onCopy(ulids.join('\n'), 'ULIDs')}
        >
          {t.actions.copyAll}
        </Button>
      </div>
      <div className="flex flex-col gap-1.5">
        {ulids.map((ulid) => (
          <div key={ulid} data-testid="ulid-row">
            <ResultRow
              value={ulid}
              copyLabel={t.actions.copy}
              onCopy={() => onCopy(ulid, 'ULID')}
            />
          </div>
        ))}
      </div>
    </ToolPanelFrame>
  );
}
