import { useState } from 'react';
import { ConvertXmlJsonUseCase } from '@/core/toolbox/application/use-cases/convert-xml-json/convert-xml-json.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertXmlJsonUseCase();
const DEFAULT_XML = '<root><name>Toolbox</name><version>1</version></root>';

export function XmlJsonPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [mode, setMode] = useState<'toJson' | 'toXml'>('toJson');
  const [input, setInput] = useState(DEFAULT_XML);

  let output: { ok: boolean; text: string };
  if (mode === 'toJson') {
    const result = useCase.xmlToJson(input);
    output = {
      ok: result.ok,
      text: result.ok ? result.json! : t.errors.invalidXml,
    };
  } else {
    const result = useCase.jsonToXml(input);
    output = {
      ok: result.ok,
      text: result.ok ? result.xml! : t.errors.invalidJsonForXml,
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
          {t.actions.xmlToJson}
        </Button>
        <Button
          size="sm"
          variant={mode === 'toXml' ? 'primary' : 'secondary'}
          onClick={() => setMode('toXml')}
        >
          {t.actions.jsonToXml}
        </Button>
      </div>
      <TextareaField
        label={mode === 'toJson' ? t.fields.xmlInput : t.fields.jsonInput}
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="relative">
        <pre
          data-testid="xml-json-output"
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
            onClick={() => onCopy(output.text, t.tools['xml-json'].label)}
          >
            {t.actions.copy}
          </Button>
        </div>
      </div>
    </ToolPanelFrame>
  );
}
