import { useState } from 'react';
import { GenerateIpv6UlaUseCase } from '@/core/toolbox/application/use-cases/generate-ipv6-ula/generate-ipv6-ula.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateIpv6UlaUseCase();

export function Ipv6UlaPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [subnetId, setSubnetId] = useState('0000');
  const [ula, setUla] = useState(() => useCase.execute(subnetId));

  return (
    <ToolPanelFrame>
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 dark:border-slate-800 dark:bg-slate-800/50">
        <div
          data-testid="ula-value"
          className="break-all font-mono text-lg text-slate-900 dark:text-slate-100"
        >
          {ula}
        </div>
        <Button variant="ghost" size="sm" onClick={() => onCopy(ula, 'ULA')}>
          {t.actions.copy}
        </Button>
      </div>
      <div className="flex items-end gap-3.5">
        <div className="flex-1">
          <TextField
            label={t.fields.ipv6SubnetId}
            value={subnetId}
            onChange={(e) =>
              setSubnetId(
                e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 4),
              )
            }
          />
        </div>
        <Button
          variant="primary"
          onClick={() => setUla(useCase.execute(subnetId || '0000'))}
        >
          {t.actions.generate}
        </Button>
      </div>
    </ToolPanelFrame>
  );
}
