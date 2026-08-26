import { useState } from 'react';
import { ConvertTomlJsonUseCase } from '@/core/toolbox/application/use-cases/convert-toml-json/convert-toml-json.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertTomlJsonUseCase();
const DEFAULT_TOML = 'title = "Toolbox"\nversion = 1';

export function TomlJsonPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [mode, setMode] = useState<'toJson' | 'toToml'>('toJson');
  const [input, setInput] = useState(DEFAULT_TOML);

  let output: { ok: boolean; text: string };
  if (mode === 'toJson') {
    const result = useCase.tomlToJson(input);
    output = {
      ok: result.ok,
      text: result.ok ? result.json! : t.errors.invalidToml,
    };
  } else {
    const result = useCase.jsonToToml(input);
    output = {
      ok: result.ok,
      text: result.ok ? result.toml! : t.errors.invalidJsonForToml,
    };
  }

  return (
    <ToolPanelFrame>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={mode === 'toJson' ? 'primary' : 'secondary'}
          onClick={() => setMode('toJson')}
        >
          {t.actions.tomlToJson}
        </Button>
        <Button
          size="sm"
          variant={mode === 'toToml' ? 'primary' : 'secondary'}
          onClick={() => setMode('toToml')}
        >
          {t.actions.jsonToToml}
        </Button>
      </div>
      <TextareaField
        label={mode === 'toJson' ? t.fields.tomlInput : t.fields.jsonInput}
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="relative">
        <pre
          data-testid="toml-json-output"
          className={`min-h-[50px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm dark:border-slate-800 dark:bg-slate-800/50 ${
            output.ok
              ? 'text-slate-900 dark:text-slate-100'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {output.text}
        </pre>
        <div className="absolute right-2.5 top-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(output.text, t.tools['toml-json'].label)}
          >
            {t.actions.copy}
          </Button>
        </div>
      </div>
    </ToolPanelFrame>
  );
}
