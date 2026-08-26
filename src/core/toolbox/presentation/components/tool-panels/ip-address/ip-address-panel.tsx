import { useState } from 'react';
import { ConvertIpAddressUseCase } from '@/core/toolbox/application/use-cases/convert-ip-address/convert-ip-address.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertIpAddressUseCase();

export function IpAddressPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [address, setAddress] = useState('192.168.1.1');
  const result = useCase.execute(address);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.ipAddressInput}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {result.ok ? (
        <div className="flex flex-col gap-2">
          <ResultRow
            label={t.labels.decimal}
            value={result.integer!}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(result.integer!, t.labels.decimal)}
          />
          <ResultRow
            label={t.labels.hex}
            value={result.hex!}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(result.hex!, t.labels.hex)}
          />
          <ResultRow
            label={t.labels.binary}
            value={result.binary!}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(result.binary!, t.labels.binary)}
          />
        </div>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidIpAddress}
        </p>
      )}
    </ToolPanelFrame>
  );
}
