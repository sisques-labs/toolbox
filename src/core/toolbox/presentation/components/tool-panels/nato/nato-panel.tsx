import { useState } from 'react';
import { ConvertNatoAlphabetUseCase } from '@/core/toolbox/application/use-cases/convert-nato-alphabet/convert-nato-alphabet.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertNatoAlphabetUseCase();

export function NatoPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('SOS');
  const output = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.inputText}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ResultRow
        value={output}
        copyLabel={t.actions.copy}
        onCopy={() => onCopy(output, 'NATO')}
      />
    </ToolPanelFrame>
  );
}
