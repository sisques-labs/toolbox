import { useState } from 'react';
import { TestRegexUseCase } from '@/core/toolbox/application/use-cases/test-regex/test-regex.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { CheckboxField } from '@/shared/presentation/components/checkbox-field/checkbox-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new TestRegexUseCase();

export function RegexPanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy?: (text: string, label: string) => void;
}) {
  const [pattern, setPattern] = useState('\\w+');
  const [text, setText] = useState('Hello Toolbox world');
  const [global, setGlobal] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [multiline, setMultiline] = useState(false);

  const flags = [
    global ? 'g' : '',
    ignoreCase ? 'i' : '',
    multiline ? 'm' : '',
  ].join('');

  const result = useCase.execute({ pattern, flags, text });

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.pattern}
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      />
      <div className="flex flex-wrap gap-4">
        <CheckboxField
          label={t.fields.flagGlobal}
          checked={global}
          onChange={() => setGlobal((v) => !v)}
        />
        <CheckboxField
          label={t.fields.flagIgnoreCase}
          checked={ignoreCase}
          onChange={() => setIgnoreCase((v) => !v)}
        />
        <CheckboxField
          label={t.fields.flagMultiline}
          checked={multiline}
          onChange={() => setMultiline((v) => !v)}
        />
      </div>
      <TextareaField
        label={t.fields.testString}
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {!result.ok ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidRegex}
        </p>
      ) : result.matches.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-300">
          {t.labels.noMatches}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {t.labels.matchCount.replace(
              '{count}',
              String(result.matches.length),
            )}
          </p>
          {result.matches.map((match, i) => (
            <div
              key={`${match.index}-${match.value}-${i}`}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm dark:border-slate-800 dark:bg-slate-800/50"
            >
              <div className="text-slate-900 dark:text-slate-100">
                {match.value}
              </div>
              <div className="mt-1 text-[11px] text-slate-400 dark:text-slate-400">
                {t.labels.matchIndex.replace('{index}', String(match.index))}
                {match.groups.length > 0 ? ` · ${match.groups.join(', ')}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </ToolPanelFrame>
  );
}
