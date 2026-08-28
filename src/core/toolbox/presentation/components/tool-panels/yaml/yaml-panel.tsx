import { useState } from 'react';
import {
  ConvertYamlUseCase,
  type YamlDirection,
} from '@/core/toolbox/application/use-cases/convert-yaml/convert-yaml.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { DownloadButton } from '@/shared/presentation/components/download-button/download-button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertYamlUseCase();
const DEFAULT_INPUT = 'name: toolbox\nversion: 1\ntags:\n  - dev\n  - tools';
const CONVERSION_ERROR_PREFIX = 'Could not convert:';

export function YamlPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [direction, setDirection] = useState<YamlDirection>('yamlToJson');
  const output = useCase.execute(input, direction);
  const hasError = output.startsWith(CONVERSION_ERROR_PREFIX);

  return (
    <ToolPanelFrame>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={direction === 'yamlToJson' ? 'primary' : 'secondary'}
          onClick={() => setDirection('yamlToJson')}
        >
          YAML → JSON
        </Button>
        <Button
          size="sm"
          variant={direction === 'jsonToYaml' ? 'primary' : 'secondary'}
          onClick={() => setDirection('jsonToYaml')}
        >
          JSON → YAML
        </Button>
      </div>
      <TextareaField
        label={
          direction === 'yamlToJson' ? t.fields.yamlInput : t.fields.jsonInput
        }
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="relative">
        <pre className="min-h-[60px] whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100">
          {output}
        </pre>
        <div className="absolute right-2.5 top-2.5 flex gap-1.5">
          <DownloadButton
            content={output}
            baseName={direction === 'yamlToJson' ? 'json' : 'yaml'}
            extension={direction === 'yamlToJson' ? 'json' : 'yaml'}
            mimeType={
              direction === 'yamlToJson' ? 'application/json' : 'text/yaml'
            }
            label={t.actions.download}
            disabled={hasError}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(output, 'Output')}
          >
            {t.actions.copy}
          </Button>
        </div>
      </div>
    </ToolPanelFrame>
  );
}
