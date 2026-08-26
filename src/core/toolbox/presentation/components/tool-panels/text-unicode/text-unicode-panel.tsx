import { useState } from 'react';
import { ConvertTextUnicodeUseCase } from '@/core/toolbox/application/use-cases/convert-text-unicode/convert-text-unicode.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertTextUnicodeUseCase();

export function TextUnicodePanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('Hi');

  let output: { ok: boolean; text: string };
  if (mode === 'encode') {
    output = { ok: true, text: useCase.toUnicode(input) };
  } else {
    const result = useCase.fromUnicode(input);
    output = {
      ok: result.ok,
      text: result.ok ? result.text! : t.errors.invalidUnicode,
    };
  }

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
        label={mode === 'encode' ? t.fields.inputText : t.fields.unicodeInput}
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="relative">
        <pre
          data-testid="text-unicode-output"
          className={`min-h-[50px] whitespace-pre-wrap break-all rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm dark:border-slate-800 dark:bg-slate-800/50 ${
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
            onClick={() => onCopy(output.text, 'Output')}
          >
            {t.actions.copy}
          </Button>
        </div>
      </div>
    </ToolPanelFrame>
  );
}
