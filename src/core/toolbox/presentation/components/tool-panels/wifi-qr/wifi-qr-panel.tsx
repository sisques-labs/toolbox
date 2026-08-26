import { useState } from 'react';
import {
  GenerateWifiQrUseCase,
  type WifiEncryption,
} from '@/core/toolbox/application/use-cases/generate-wifi-qr/generate-wifi-qr.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { CheckboxField } from '@/shared/presentation/components/checkbox-field/checkbox-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateWifiQrUseCase();

export function WifiQrPanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [ssid, setSsid] = useState('MyNetwork');
  const [password, setPassword] = useState('secret123');
  const [encryption, setEncryption] = useState<WifiEncryption>('WPA');
  const [hidden, setHidden] = useState(false);
  const result = useCase.execute({ ssid, password, encryption, hidden });

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.wifiSsid}
        value={ssid}
        onChange={(e) => setSsid(e.target.value)}
      />
      {encryption !== 'nopass' && (
        <TextField
          label={t.fields.wifiPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <SelectField
          label={t.fields.wifiEncryption}
          value={encryption}
          onChange={(e) => setEncryption(e.target.value as WifiEncryption)}
          options={[
            { value: 'WPA', label: 'WPA/WPA2' },
            { value: 'WEP', label: 'WEP' },
            { value: 'nopass', label: t.labels.wifiNoPassword },
          ]}
        />
        <div className="flex items-end pb-2">
          <CheckboxField
            label={t.fields.wifiHidden}
            checked={hidden}
            onChange={() => setHidden((v) => !v)}
          />
        </div>
      </div>
      {!result.ok ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.emptyWifiSsid}
        </p>
      ) : (
        <div
          className="mx-auto w-full max-w-xs rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800"
          data-testid="wifi-qr-preview"
          // SVG comes from the trusted uqr library for the derived WIFI: payload.
          dangerouslySetInnerHTML={{ __html: result.svg }}
        />
      )}
    </ToolPanelFrame>
  );
}
