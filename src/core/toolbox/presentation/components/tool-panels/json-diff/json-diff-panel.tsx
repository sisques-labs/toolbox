import { useState } from 'react';
import { DiffJsonUseCase } from '@/core/toolbox/application/use-cases/diff-json/diff-json.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new DiffJsonUseCase();

const DEFAULT_LEFT = '{\n  "name": "toolbox",\n  "version": 1\n}';
const DEFAULT_RIGHT =
  '{\n  "name": "toolbox",\n  "version": 2,\n  "tags": ["dev"]\n}';

function formatValue(value: unknown): string {
  return JSON.stringify(value);
}

export function JsonDiffPanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy?: (text: string, label: string) => void;
}) {
  const [left, setLeft] = useState(DEFAULT_LEFT);
  const [right, setRight] = useState(DEFAULT_RIGHT);
  const result = useCase.execute(left, right);

  return (
    <ToolPanelFrame>
      <div className="grid gap-3 md:grid-cols-2">
        <TextareaField
          label={t.fields.jsonLeft}
          rows={8}
          value={left}
          onChange={(e) => setLeft(e.target.value)}
        />
        <TextareaField
          label={t.fields.jsonRight}
          rows={8}
          value={right}
          onChange={(e) => setRight(e.target.value)}
        />
      </div>
      {!result.ok ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          {result.error === 'invalidLeft'
            ? t.errors.invalidJsonLeft
            : t.errors.invalidJsonRight}
        </p>
      ) : result.changes.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-300">
          {t.labels.noDifferences}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {t.labels.diffCount.replace(
              '{count}',
              String(result.changes.length),
            )}
          </p>
          {result.changes.map((change) => {
            const kindLabel =
              change.kind === 'added'
                ? t.labels.diffAdded
                : change.kind === 'removed'
                  ? t.labels.diffRemoved
                  : t.labels.diffChanged;

            return (
              <div
                key={`${change.kind}-${change.path}`}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm dark:border-slate-800 dark:bg-slate-800/50"
              >
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-400">
                  {kindLabel}
                  {' · '}
                  {change.path}
                </div>
                {change.kind === 'added' && (
                  <div className="text-emerald-700 dark:text-emerald-400">
                    + {formatValue(change.after)}
                  </div>
                )}
                {change.kind === 'removed' && (
                  <div className="text-red-600 dark:text-red-400">
                    − {formatValue(change.before)}
                  </div>
                )}
                {change.kind === 'changed' && (
                  <div className="flex flex-col gap-0.5">
                    <div className="text-red-600 dark:text-red-400">
                      − {formatValue(change.before)}
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-400">
                      + {formatValue(change.after)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </ToolPanelFrame>
  );
}
