import { useState } from 'react';
import { GenerateNumeronymUseCase } from '@/core/toolbox/application/use-cases/generate-numeronym/generate-numeronym.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateNumeronymUseCase();

export function NumeronymPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('internationalization');
  const numeronym = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.inputText}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ResultRow
        value={numeronym}
        copyLabel={t.actions.copy}
        onCopy={() => onCopy(numeronym, 'Numeronym')}
      />
    </ToolPanelFrame>
  );
}
