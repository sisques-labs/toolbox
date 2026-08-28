import { useState } from 'react';
import { FormatXmlUseCase } from '@/core/toolbox/application/use-cases/format-xml/format-xml.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new FormatXmlUseCase();
const DEFAULT_INPUT = '<root><a>1</a><b>2</b></root>';

export function XmlFormatterPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [result, setResult] = useState(() => useCase.format(DEFAULT_INPUT, 2));

  function handleChange(value: string) {
    setInput(value);
    setResult(useCase.format(value, 2));
  }

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.xmlInput}
        rows={8}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="flex gap-2.5">
        <Button
          variant="secondary"
          onClick={() => setResult(useCase.format(input, 2))}
        >
          {t.actions.format}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            const minified = useCase.minify(input);
            if (minified.ok) setInput(minified.formatted!);
            setResult(minified);
          }}
        >
          {t.actions.minify}
        </Button>
      </div>
      {result.ok ? (
        <pre
          data-testid="xml-output"
          className="overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
        >
          {result.formatted}
        </pre>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidXml}
        </p>
      )}
      {result.ok && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onCopy(result.formatted!, t.tools['xml-formatter'].label)
            }
          >
            {t.actions.copy}
          </Button>
        </div>
      )}
    </ToolPanelFrame>
  );
}
