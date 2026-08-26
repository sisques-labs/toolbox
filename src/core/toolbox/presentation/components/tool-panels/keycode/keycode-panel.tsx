import { useState, type KeyboardEvent } from 'react';
import {
  DescribeKeyEventUseCase,
  type KeyEventDescription,
} from '@/core/toolbox/application/use-cases/describe-key-event/describe-key-event.use-case';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { Badge } from '@/shared/presentation/components/badge/badge';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new DescribeKeyEventUseCase();

export function KeycodePanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [result, setResult] = useState<KeyEventDescription | null>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    setResult(
      useCase.execute({
        key: event.key,
        code: event.code,
        keyCode: event.keyCode,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
      }),
    );
  }

  return (
    <ToolPanelFrame>
      <div
        data-testid="keycode-listener"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-sm text-slate-500 outline-none focus:border-blue-400 dark:border-slate-700 dark:text-slate-400"
      >
        {t.labels.pressAnyKey}
      </div>
      {result && (
        <div className="flex flex-col gap-2">
          {(
            [
              ['keyValue', 'keycode-key', result.key],
              ['codeValue', 'keycode-code', result.code],
              ['keyCodeValue', 'keycode-keycode', String(result.keyCode)],
            ] as const
          ).map(([labelKey, testId, value]) => (
            <div
              key={testId}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <span className="text-[11px] font-semibold text-slate-400">
                {t.labels[labelKey]}
              </span>
              <span
                data-testid={testId}
                className="font-mono text-sm text-slate-900 dark:text-slate-100"
              >
                {value}
              </span>
            </div>
          ))}
          {result.modifiers.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {result.modifiers.map((modifier) => (
                <Badge key={modifier} tone="primary">
                  {modifier}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </ToolPanelFrame>
  );
}
