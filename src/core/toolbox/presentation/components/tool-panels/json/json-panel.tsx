import { useState } from 'react';
import {
  FormatJsonUseCase,
  type JsonIndent,
} from '@/core/toolbox/application/use-cases/format-json/format-json.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new FormatJsonUseCase();
const INDENT_OPTIONS = [
  { value: '2', label: '2' },
  { value: '4', label: '4' },
  { value: 'tab', label: 'Tab' },
];
const DEFAULT_INPUT =
  '{\n  "name": "toolbox",\n  "version": 1,\n  "tags": ["dev", "tools"]\n}';

export function JsonPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [indent, setIndent] = useState<JsonIndent>('2');
  const result = useCase.execute(input, indent);

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.jsonInput}
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex items-center gap-2.5">
        <div className="w-[140px]">
          <SelectField
            label={t.fields.indent}
            value={indent}
            onChange={(e) => setIndent(e.target.value as JsonIndent)}
            options={INDENT_OPTIONS}
          />
        </div>
        <Button
          variant="secondary"
          onClick={() => setInput(useCase.minify(input))}
        >
          {t.actions.minify}
        </Button>
      </div>
      {result.ok ? (
        <div className="relative">
          <pre
            data-testid="json-output"
            className="whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
          >
            {result.text}
          </pre>
          <div className="absolute right-2.5 top-2.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopy(result.text, 'JSON')}
            >
              {t.actions.copy}
            </Button>
          </div>
        </div>
      ) : (
        <div
          data-testid="json-output"
          className="rounded-lg bg-red-50 p-3.5 font-mono text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400"
        >
          {result.text}
        </div>
      )}
    </ToolPanelFrame>
  );
}
