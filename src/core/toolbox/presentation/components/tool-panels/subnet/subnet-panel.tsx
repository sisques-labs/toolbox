import { useState } from 'react';
import { CalculateSubnetUseCase } from '@/core/toolbox/application/use-cases/calculate-subnet/calculate-subnet.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new CalculateSubnetUseCase();

export function SubnetPanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [cidr, setCidr] = useState('192.168.1.0/24');
  const result = useCase.execute(cidr);

  const rows: { label: string; value: string }[] = result.ok
    ? [
        { label: t.labels.networkAddress, value: result.network! },
        { label: t.labels.broadcastAddress, value: result.broadcast! },
        { label: t.labels.subnetMask, value: result.mask! },
        {
          label: t.labels.hostRange,
          value: `${result.firstHost} – ${result.lastHost}`,
        },
        { label: t.labels.totalAddresses, value: String(result.total) },
        { label: t.labels.usableHosts, value: String(result.usable) },
      ]
    : [];

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.cidr}
        value={cidr}
        onChange={(e) => setCidr(e.target.value)}
      />
      {result.ok ? (
        <div className="flex flex-col gap-2">
          {rows.map((row) => (
            <ResultRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-red-50 p-3.5 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
          {t.errors.invalidCidr}
        </div>
      )}
    </ToolPanelFrame>
  );
}
