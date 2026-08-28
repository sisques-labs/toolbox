import { useState } from 'react';
import { ConvertCaseUseCase } from '@/core/toolbox/application/use-cases/convert-case/convert-case.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertCaseUseCase();

export function CasePanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('Hello World Example');
  const result = useCase.execute(input);

  const rows: { label: string; value: string }[] = [
    { label: 'camelCase', value: result.camelCase },
    { label: 'PascalCase', value: result.pascalCase },
    { label: 'snake_case', value: result.snakeCase },
    { label: 'kebab-case', value: result.kebabCase },
    { label: 'CONSTANT_CASE', value: result.constantCase },
    { label: 'Title Case', value: result.titleCase },
  ];

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.inputText}
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <ResultRow
            key={row.label}
            label={row.label}
            value={row.value}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(row.value, row.label)}
          />
        ))}
      </div>
    </ToolPanelFrame>
  );
}
