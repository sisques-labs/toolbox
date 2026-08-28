import { useState } from 'react';
import { ConvertTomlYamlUseCase } from '@/core/toolbox/application/use-cases/convert-toml-yaml/convert-toml-yaml.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertTomlYamlUseCase();
const DEFAULT_TOML = 'title = "Toolbox"\nversion = 1';

export function TomlYamlPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [mode, setMode] = useState<'toYaml' | 'toToml'>('toYaml');
  const [input, setInput] = useState(DEFAULT_TOML);

  let output: { ok: boolean; text: string };
  if (mode === 'toYaml') {
    const result = useCase.tomlToYaml(input);
    output = {
      ok: result.ok,
      text: result.ok ? result.yaml! : t.errors.invalidToml,
    };
  } else {
    const result = useCase.yamlToToml(input);
    output = {
      ok: result.ok,
      text: result.ok ? result.toml! : t.errors.invalidYamlForToml,
    };
  }

  return (
    <ToolPanelFrame>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={mode === 'toYaml' ? 'primary' : 'secondary'}
          onClick={() => setMode('toYaml')}
        >
          {t.actions.tomlToYaml}
        </Button>
        <Button
          size="sm"
          variant={mode === 'toToml' ? 'primary' : 'secondary'}
          onClick={() => setMode('toToml')}
        >
          {t.actions.yamlToToml}
        </Button>
      </div>
      <TextareaField
        label={mode === 'toYaml' ? t.fields.tomlInput : t.fields.yamlInput}
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="relative">
        <pre
          data-testid="toml-yaml-output"
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
            onClick={() => onCopy(output.text, t.tools['toml-yaml'].label)}
          >
            {t.actions.copy}
          </Button>
        </div>
      </div>
    </ToolPanelFrame>
  );
}
