import { useState } from 'react';
import { LookupMacVendorUseCase } from '@/core/toolbox/application/use-cases/lookup-mac-vendor/lookup-mac-vendor.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new LookupMacVendorUseCase();

export function MacLookupPanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [mac, setMac] = useState('F0:EE:7A:11:22:33');
  const result = useCase.execute(mac);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.macAddressInput}
        value={mac}
        onChange={(e) => setMac(e.target.value)}
      />
      {result.ok ? (
        <ResultRow label={t.labels.macVendor} value={result.vendor!} />
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {result.reason === 'invalid'
            ? t.errors.invalidMac
            : t.errors.macVendorNotFound}
        </p>
      )}
    </ToolPanelFrame>
  );
}
