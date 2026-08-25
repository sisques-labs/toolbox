import { useState } from 'react';
import { GenerateSlugUseCase } from '@/core/toolbox/application/use-cases/generate-slug/generate-slug.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateSlugUseCase();

export function SlugPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('Hello World Example!');
  const slug = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.inputText}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ResultRow
        value={slug}
        copyLabel={t.actions.copy}
        onCopy={() => onCopy(slug, 'Slug')}
      />
    </ToolPanelFrame>
  );
}
