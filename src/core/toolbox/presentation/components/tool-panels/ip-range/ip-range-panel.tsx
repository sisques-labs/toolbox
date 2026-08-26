import { useState } from 'react';
import { ExpandIpRangeUseCase } from '@/core/toolbox/application/use-cases/expand-ip-range/expand-ip-range.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { DownloadButton } from '@/shared/presentation/components/download-button/download-button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ExpandIpRangeUseCase();

export function IpRangePanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [cidr, setCidr] = useState('192.168.1.0/30');
  const result = useCase.execute(cidr);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.cidr}
        value={cidr}
        onChange={(e) => setCidr(e.target.value)}
      />
      {result.ok ? (
        <>
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>
              {t.labels.addressCount.replace(
                '{count}',
                String(result.addresses!.length),
              )}
            </span>
            <DownloadButton
              content={result.addresses!.join('\n')}
              baseName="ip-range"
              extension="txt"
              label={t.actions.download}
            />
          </div>
          {result.truncated && (
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {t.labels.truncatedNotice.replace(
                '{count}',
                String(result.addresses!.length),
              )}
            </p>
          )}
          <pre
            data-testid="ip-range-list"
            className="max-h-80 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
          >
            {result.addresses!.join('\n')}
          </pre>
        </>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidCidr}
        </p>
      )}
    </ToolPanelFrame>
  );
}
