import { useState } from 'react';
import { ApplyCypherUseCase } from '@/core/toolbox/application/use-cases/apply-cypher/apply-cypher.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ApplyCypherUseCase();

export function CypherPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('Hello, World!');
  const [shift, setShift] = useState(3);
  const result = useCase.execute(input, shift);

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.inputText}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex items-end gap-3.5">
        <div className="flex-1">
          <TextField
            label={t.fields.cypherShift}
            type="number"
            value={shift}
            onChange={(e) => setShift(Number(e.target.value) || 0)}
          />
        </div>
        <Button variant="secondary" onClick={() => setShift(13)}>
          {t.actions.rot13}
        </Button>
      </div>
      <ResultRow
        value={result}
        copyLabel={t.actions.copy}
        onCopy={() => onCopy(result, t.tools.cypher.label)}
      />
    </ToolPanelFrame>
  );
}
