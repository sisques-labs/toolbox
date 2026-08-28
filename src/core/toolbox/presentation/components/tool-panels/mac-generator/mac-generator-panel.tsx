import { useState } from 'react';
import { GenerateMacAddressUseCase } from '@/core/toolbox/application/use-cases/generate-mac-address/generate-mac-address.use-case';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { CheckboxField } from '@/shared/presentation/components/checkbox-field/checkbox-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateMacAddressUseCase();

export function MacGeneratorPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [separator, setSeparator] = useState<':' | '-'>(':');
  const [locallyAdministered, setLocallyAdministered] = useState(false);
  const [multicast, setMulticast] = useState(false);
  const options = { separator, locallyAdministered, multicast };
  const [mac, setMac] = useState(() => useCase.execute(options));

  function regenerate() {
    setMac(useCase.execute(options));
  }

  return (
    <ToolPanelFrame>
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 dark:border-slate-800 dark:bg-slate-800/50">
        <div
          data-testid="mac-value"
          className="break-all font-mono text-lg text-slate-900 dark:text-slate-100"
        >
          {mac}
        </div>
        <Button variant="ghost" size="sm" onClick={() => onCopy(mac, 'MAC')}>
          {t.actions.copy}
        </Button>
      </div>
      <div className="flex items-center gap-3.5">
        <div className="flex-1">
          <SelectField
            label={t.fields.macSeparator}
            value={separator}
            onChange={(e) => setSeparator(e.target.value as ':' | '-')}
            options={[
              { value: ':', label: ':' },
              { value: '-', label: '-' },
            ]}
          />
        </div>
        <Button variant="primary" onClick={regenerate}>
          {t.actions.generate}
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <CheckboxField
          label={t.fields.macLocallyAdministered}
          checked={locallyAdministered}
          onChange={() => setLocallyAdministered((v) => !v)}
        />
        <CheckboxField
          label={t.fields.macMulticast}
          checked={multicast}
          onChange={() => setMulticast((v) => !v)}
        />
      </div>
    </ToolPanelFrame>
  );
}
