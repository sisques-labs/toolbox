import { useState } from 'react';
import { ParseUserAgentUseCase } from '@/core/toolbox/application/use-cases/parse-user-agent/parse-user-agent.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ParseUserAgentUseCase();

export function UserAgentPanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [input, setInput] = useState(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  );
  const result = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.userAgentInput}
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        <div data-testid="ua-browser">
          <ResultRow
            label={t.labels.browser}
            value={`${result.browserName} ${result.browserVersion}`}
          />
        </div>
        <div data-testid="ua-os">
          <ResultRow
            label={t.labels.operatingSystem}
            value={`${result.osName} ${result.osVersion}`}
          />
        </div>
        <ResultRow label={t.labels.deviceType} value={result.deviceType} />
        <ResultRow label={t.labels.engine} value={result.engineName} />
      </div>
    </ToolPanelFrame>
  );
}
