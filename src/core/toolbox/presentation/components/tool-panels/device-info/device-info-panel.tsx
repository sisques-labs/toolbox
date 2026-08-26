import { useState } from 'react';
import { CollectDeviceInfoUseCase } from '@/core/toolbox/application/use-cases/collect-device-info/collect-device-info.use-case';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new CollectDeviceInfoUseCase();

export function DeviceInfoPanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
}) {
  const [info] = useState(() => useCase.execute());

  return (
    <ToolPanelFrame>
      <div className="flex flex-col gap-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="mb-0.5 text-[11px] font-semibold text-slate-400">
            {t.labels.userAgent}
          </div>
          <div
            data-testid="device-info-user-agent"
            className="break-all font-mono text-sm text-slate-900 dark:text-slate-100"
          >
            {info.userAgent}
          </div>
        </div>
        <ResultRow label={t.labels.platform} value={info.platform} />
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="mb-0.5 text-[11px] font-semibold text-slate-400">
            {t.labels.language}
          </div>
          <div
            data-testid="device-info-language"
            className="break-all font-mono text-sm text-slate-900 dark:text-slate-100"
          >
            {info.language}
          </div>
        </div>
        <ResultRow
          label={t.labels.cookiesEnabled}
          value={info.cookiesEnabled ? t.labels.yes : t.labels.no}
        />
        <ResultRow
          label={t.labels.online}
          value={info.onLine ? t.labels.yes : t.labels.no}
        />
        <ResultRow
          label={t.labels.screenResolution}
          value={`${info.screenWidth} × ${info.screenHeight}`}
        />
        <ResultRow
          label={t.labels.viewportSize}
          value={`${info.viewportWidth} × ${info.viewportHeight}`}
        />
        <ResultRow
          label={t.labels.pixelRatio}
          value={String(info.pixelRatio)}
        />
        <ResultRow label={t.labels.timezone} value={info.timezone} />
      </div>
    </ToolPanelFrame>
  );
}
