import { useState } from 'react';
import { SearchEmojiUseCase } from '@/core/toolbox/application/use-cases/search-emoji/search-emoji.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new SearchEmojiUseCase();

export function EmojiPickerPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [query, setQuery] = useState('');
  const results = useCase.execute(query);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.cheatsheetQuery}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 ? (
        <div className="grid grid-cols-6 gap-2">
          {results.map((entry) => (
            <button
              key={entry.name}
              type="button"
              title={entry.name}
              onClick={() => onCopy(entry.emoji, entry.name)}
              className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-2 text-2xl hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:bg-slate-800"
            >
              {entry.emoji}
              <span className="truncate text-[10px] font-normal text-slate-500 dark:text-slate-400">
                {entry.name}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t.labels.noMatches}
        </p>
      )}
    </ToolPanelFrame>
  );
}
