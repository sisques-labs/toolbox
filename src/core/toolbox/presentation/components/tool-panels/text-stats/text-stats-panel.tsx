import { useState } from 'react';
import { AnalyzeTextStatsUseCase } from '@/core/toolbox/application/use-cases/analyze-text-stats/analyze-text-stats.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new AnalyzeTextStatsUseCase();
const DEFAULT_INPUT =
  'The quick brown fox jumps over the lazy dog. It ran into the forest!';

export function TextStatsPanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const stats = useCase.execute(input);

  const rows: { label: string; value: string }[] = [
    { label: t.labels.characters, value: String(stats.characters) },
    {
      label: t.labels.charactersNoSpaces,
      value: String(stats.charactersNoSpaces),
    },
    { label: t.labels.words, value: String(stats.words) },
    { label: t.labels.sentences, value: String(stats.sentences) },
    { label: t.fields.paragraphs, value: String(stats.paragraphs) },
    {
      label: t.labels.readingTime,
      value: t.labels.readingTimeValue.replace(
        '{count}',
        String(stats.readingTimeMinutes),
      ),
    },
  ];

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.textStatsInput}
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        {rows.map((row) => (
          <ResultRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </ToolPanelFrame>
  );
}
