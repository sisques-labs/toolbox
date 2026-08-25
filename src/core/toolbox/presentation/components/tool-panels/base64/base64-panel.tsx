import { useState } from 'react';
import {
  ConvertBase64UseCase,
  type Base64Mode,
} from '@/core/toolbox/application/use-cases/convert-base64/convert-base64.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertBase64UseCase();

export function Base64Panel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('Hello, Toolbox!');
  const [mode, setMode] = useState<Base64Mode>('encode');
  const result = useCase.execute(input, mode);

  return (
    <ToolPanelFrame>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={mode === 'encode' ? 'primary' : 'secondary'}
          onClick={() => setMode('encode')}
        >
          {t.actions.encode}
        </Button>
        <Button
          size="sm"
          variant={mode === 'decode' ? 'primary' : 'secondary'}
          onClick={() => setMode('decode')}
        >
          {t.actions.decode}
        </Button>
      </div>
      <TextareaField
        label={mode === 'encode' ? t.labels.plainText : t.labels.base64Text}
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="relative">
        <pre
          className={`min-h-[50px] whitespace-pre-wrap break-all rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm dark:border-slate-800 dark:bg-slate-800/50 ${
            result.ok
              ? 'text-slate-900 dark:text-slate-100'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {result.text}
        </pre>
        <div className="absolute right-2.5 top-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(result.text, 'Output')}
          >
            {t.actions.copy}
          </Button>
        </div>
      </div>
    </ToolPanelFrame>
  );
}
