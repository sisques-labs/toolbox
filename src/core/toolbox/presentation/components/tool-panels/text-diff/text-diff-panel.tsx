import { useState } from 'react';
import { DiffTextUseCase } from '@/core/toolbox/application/use-cases/diff-text/diff-text.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new DiffTextUseCase();

export function TextDiffPanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy?: (text: string, label: string) => void;
}) {
  const [left, setLeft] = useState('hello\nworld\nfoo');
  const [right, setRight] = useState('hello\nthere\nfoo');
  const result = useCase.execute(left, right);

  return (
    <ToolPanelFrame>
      <div className="grid gap-3 md:grid-cols-2">
        <TextareaField
          label={t.fields.textLeft}
          rows={8}
          value={left}
          onChange={(e) => setLeft(e.target.value)}
        />
        <TextareaField
          label={t.fields.textRight}
          rows={8}
          value={right}
          onChange={(e) => setRight(e.target.value)}
        />
      </div>
      <div
        className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 font-mono text-sm dark:border-slate-800 dark:bg-slate-800/50"
        data-testid="text-diff-result"
      >
        {result.lines.length === 0 ? (
          <p className="p-3 text-slate-500 dark:text-slate-400">
            {t.labels.noDifferences}
          </p>
        ) : (
          result.lines.map((line, index) => (
            <div
              key={`${line.kind}-${index}-${line.text}`}
              className={`whitespace-pre-wrap break-all px-3 py-0.5 ${
                line.kind === 'added'
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300'
                  : line.kind === 'removed'
                    ? 'bg-red-100 text-red-900 dark:bg-red-950/50 dark:text-red-300'
                    : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              <span className="mr-2 inline-block w-3 select-none opacity-60">
                {line.kind === 'added'
                  ? '+'
                  : line.kind === 'removed'
                    ? '−'
                    : ' '}
              </span>
              {line.text || ' '}
            </div>
          ))
        )}
      </div>
    </ToolPanelFrame>
  );
}
